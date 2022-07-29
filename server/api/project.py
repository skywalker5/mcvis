import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
import pandas as pd
import numpy as np, pickle
import sklearn
import random
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from tsne import TSNE
from textdistance import levenshtein
from collections import Counter
import scipy.io as sio
DATASETS_PATH = 'data/'
MAX_FILTER = 100

colors = ['#8dd3c7', '#ffffb3', '#bebada',
'#fb8072', '#80b1d3', '#fdb462',
'#b3de69', '#fccde5', '#d9d9d9',
'#bc80bd', '#ccebc5', '#ffed6f',
]

def initialize_from_task(MODE="dblp0614"):
    if MODE == "dblp0912":
        docset_path = "paper-2009-2012.csv"
    elif MODE == "dblp0614":
        docset_path = "paper-2006-2014.csv"
    auth_meta_path = "author-metadata.csv"
    word_meta_path = "word-metadata.csv"
    doc_meta_path = "doc-metadata.csv"
    emb_path = "initial_data.mat"
    author_doc_path = "ad.csv"
    author_author_path = "aa.csv"
    doc_doc_path = "dd.csv"
    author_word_path = "aw.mat"
    doc_word_path = "dw.mat"
    project = Project(name=MODE, docset_path=docset_path, 
        auth_meta_path=auth_meta_path, word_meta_path=word_meta_path,
        doc_meta_path=doc_meta_path, emb_path=emb_path, author_doc_path=author_doc_path, author_author_path=author_author_path,
        doc_doc_path=doc_doc_path, author_word_path=author_word_path, doc_word_path=doc_word_path)
    return project

class Project:
    def __init__(self, name=None, docset_path=None, 
            auth_meta_path=None, word_meta_path=None,
            doc_meta_path=None, emb_path=None, author_doc_path=None, author_author_path=None,
        doc_doc_path=None, author_word_path=None, doc_word_path=None):
        
        ## Search Panel
        self.topknum = 1000

        ## Embedding Panel
        self.tsne_shrinkage = 0.4
        
        self.name = name
        self.docset_path = docset_path
        self.auth_meta_path = auth_meta_path
        self.word_meta_path = word_meta_path
        self.doc_meta_path = doc_meta_path
        self.author_doc_path = author_doc_path
        self.author_author_path = author_author_path
        self.doc_doc_path = doc_doc_path
        self.author_word_path = author_word_path
        self.doc_word_path = doc_word_path
        self.emb_path = emb_path
        self.data = None
        self.query_list = []
        self.search_selected_items = set()
        self.search_removed_items = set()
        self.search_current_selected_items = set()
        self.selected_history = {}
        self.original_data = {}
        self.xmin_d, self.xmax_d, self.ymin_d, self.ymax_d = 0,0,0,0
        self.window_width_scatter = 0
        self.window_height_scatter = 0
        self.window_width_zoom = 0
        self.window_height_zoom = 0
        self.x_min, self.x_max = 0,0
        self.y_min, self.y_max = 0,0
        self.zoom_x_min, self.zoom_x_max = 0,0
        self.zoom_y_min, self.zoom_y_max = 0,0
        self.year_min, self.year_max = 0,0
        self.year_selected = [2010, 2014]
        self.H_tsne_trans = None
        self.current_rate = {}

        self.original_clusters = {}
        self.in_clusters = {}
        self.out_clusters = {}
        self.cluster_boundaries = {}
        self.cluster_axes = {}

        self.zoomed_clusters = {}
        self.zoomed_in_clusters = {}

        self.cluster_id = -1
        self.color_map = {}
        self.detail_object = {}

        self.indices_to_vis = []
        self.query_cands = []

        self.etype_selection_search= {
            'auth': True,
            'doc': True,
            'word': True,
        }

        self.etype_selection_zoom= {
            'auth': True,
            'doc': True,
            'word': True,
        }

        self.etype_selection_recom= {
            'auth': True,
            'doc': True,
            'word': True,
        }

        # self.selected_for_recom = {
        #     'author': True,
        #     'doc': True,
        #     'word': True,
        # }

        # self.selected_for_recom = {
        #     'author': True,
        #     'doc': True,
        #     'word': True,
        # }

    def get_cluster_id(self):
        self.cluster_id += 1
        if self.cluster_id == 12:
            self.cluster_id = 0
        return self.cluster_id

    def removepunc(self,my_str):
        return '0'

    def hasNumbers(self,inputString):
        return (bool(re.search(r'\d', inputString)))

    def ask(self, question, context):
        return ['a']

    def getanswers(self,question):
        self.query_list.append(question)
        return self.query_list

    def launch(self):
        ## load data
        doc_file_path = os.path.join(DATASETS_PATH, self.docset_path)
        auth_meta_path = os.path.join(DATASETS_PATH, self.auth_meta_path)
        word_meta_path = os.path.join(DATASETS_PATH, self.word_meta_path)
        doc_meta_path = os.path.join(DATASETS_PATH, self.doc_meta_path)
        emb_path = os.path.join(DATASETS_PATH, self.emb_path)
        author_doc_path = os.path.join(DATASETS_PATH, self.author_doc_path)

        author_author_path = os.path.join(DATASETS_PATH, self.author_author_path)
        doc_doc_path = os.path.join(DATASETS_PATH, self.doc_doc_path)
        author_word_path = os.path.join(DATASETS_PATH, self.author_word_path)
        doc_word_path = os.path.join(DATASETS_PATH, self.doc_word_path)

        if os.path.exists(doc_file_path):
            self.doc_df = pd.read_csv(doc_file_path, index_col=0)
            self.doc_df.index = range(len(self.doc_df))
            self.doc_df_fil = self.doc_df.copy()
            self.doc_fil_idx = self.doc_df_fil.index
            self.auth_meta_df = pd.read_csv(auth_meta_path, index_col=0)
            self.auth_meta_df.index = range(len(self.auth_meta_df))
            self.word_meta_df = pd.read_csv(word_meta_path, index_col=2, dtype={"word":str})
            self.word_meta_df.word[self.word_meta_df.word.isna()] = "nan"
            self.word_meta_df = self.word_meta_df.sort_index()
            self.word2id = {self.word_meta_df.word[i]:self.word_meta_df.index[i] for i in range(len(self.word_meta_df)) }
            self.auth_word2id = {}

            self.doc_meta_df = pd.read_csv(doc_meta_path, index_col=0)
            self.doc_meta_df.index = range(len(self.doc_meta_df))

            self.name_df = pd.concat([self.auth_meta_df['name'], self.doc_meta_df['title'], self.word_meta_df['word']]).to_numpy()

            self.emb_mat_dict = sio.loadmat(emb_path)
            self.author_doc_df = pd.read_csv(author_doc_path, index_col=0)
            self.author_doc_df.index = self.author_doc_df.index-1
            self.author_doc_df.doc = self.author_doc_df.doc-1
            self.doc_author_df = self.author_doc_df.reset_index().set_index("doc")

            self.auth_auth_df = pd.read_csv(author_author_path, index_col=2)
            self.auth_auth_df.index = self.auth_auth_df.index-1
            self.auth_auth_df.dst = self.auth_auth_df.dst-1
            self.doc_doc_df = pd.read_csv(doc_doc_path, index_col=2)
            self.doc_doc_df.index = self.doc_doc_df.index-1
            self.doc_doc_df.dst = self.doc_doc_df.dst-1
            self.doc_doc_df_by = self.doc_doc_df.reset_index().set_index("dst")
            self.auth_word_mat = sio.loadmat(author_word_path)['aw']
            self.doc_word_mat = sio.loadmat(doc_word_path)['dw']
            
        else:
            print("No data exist!")
            exit(1)

        self.H = np.concatenate((self.emb_mat_dict['Ha'], \
            self.emb_mat_dict['Hd'], \
            self.emb_mat_dict['Hw']), axis = 0)
        self.H_tsne = np.concatenate((self.emb_mat_dict['Ha_tsne'], \
            self.emb_mat_dict['Hd_tsne'], \
            self.emb_mat_dict['Hw_tsne']), axis = 0)
        self.H_tsne_trans = self.H_tsne.copy()
        self.x_min, self.x_max = self.H_tsne[:,0].min(), self.H_tsne[:,0].max()
        self.y_min, self.y_max = self.H_tsne[:,1].min(), self.H_tsne[:,1].max()
        # load pre-computed clusters info of entities
        self.clusters = np.concatenate((self.emb_mat_dict['cluster_a'], \
            self.emb_mat_dict['cluster_d'], \
            self.emb_mat_dict['cluster_w']))
        self.n_a,self.n_d,self.n_w = \
            np.shape(self.emb_mat_dict['Ha_tsne'])[0],\
                np.shape(self.emb_mat_dict['Hd_tsne'])[0],\
                    np.shape(self.emb_mat_dict['Hw_tsne'])[0]

        # load detail list
        if os.path.exists("data/detail_doc.pickle"):
            with open("data/detail_doc.pickle", 'rb') as handle:
                self.detail_list_doc = pickle.load(handle)
        else:
            self.detail_list_doc = {
                i:{
                    "id":i+self.n_a,
                    "Type":"Doc",
                    "Name":d["title"],
                    "Venue":d["venue"],
                    "Authors":self.auth_meta_df.name.loc[self.doc_author_df['author'].loc[[i]].tolist()].tolist() if i in self.doc_author_df.index else [],
                    'Cited':self.doc_doc_df['dst'].loc[[i]].tolist() if i in self.doc_doc_df.index else [],
                    'Cited By':self.doc_doc_df_by['src'].loc[[i]].tolist() if i in self.doc_doc_df_by.index else [],
                    'Top Keywords':self.word_meta_df.word.loc[np.argsort(-self.doc_word_mat[i].todense()).tolist()[0][:10]].tolist(),
                }
                for i,d in self.doc_meta_df.iterrows()
            }
            with open('data/detail_doc.pickle', 'wb') as handle:
                pickle.dump(self.detail_list_doc, handle, protocol=pickle.HIGHEST_PROTOCOL)

        if os.path.exists("data/detail_word.pickle"):
            with open("data/detail_word.pickle", 'rb') as handle:
                self.detail_list_word = pickle.load(handle)
        else:
            Hw_norm = sklearn.preprocessing.normalize(self.emb_mat_dict["Hw"], norm="l2")
            self.detail_list_word = {
                i:{
                    'id': i+self.n_a+self.n_d,
                    'Type':'Word',
                    'Name':d['word'],
                    'Synonyms':self.word_meta_df.word.loc[np.argsort(-Hw_norm.dot(Hw_norm[i]))[1:11].tolist()].tolist()
                }
                for i,d in self.word_meta_df.iterrows()
            }
            with open('data/detail_word.pickle', 'wb') as handle:
                pickle.dump(self.detail_list_word, handle, protocol=pickle.HIGHEST_PROTOCOL)
        if os.path.exists("data/detail_auth.pickle"):
            with open("data/detail_auth.pickle", 'rb') as handle:
                self.detail_list_auth = pickle.load(handle)
        else:
            self.detail_list_auth = {
                i:{
                    'id': i,
                    'Type':'Author',
                    'Name':d['name'],
                    'Papers':self.author_doc_df['doc'].loc[[i]].tolist() if i in self.author_doc_df.index else [],
                    'Co-authors':self.auth_meta_df.name.loc[self.auth_auth_df['dst'].loc[[i]].tolist()].tolist() if i in self.auth_auth_df.index else [],
                    'Top Keywords':self.word_meta_df.word.loc[np.argsort(-self.auth_word_mat[i].todense()).tolist()[0][:10]].tolist(),
                }
                for i,d in self.auth_meta_df.iterrows()
            }
            with open('data/detail_auth.pickle', 'wb') as handle:
                pickle.dump(self.detail_list_auth, handle, protocol=pickle.HIGHEST_PROTOCOL)

        # load index
        self.index = list(range(len(self.clusters)))
        np.random.shuffle(self.index)

        all_words_lists = [l.lower().split(' ') for l in list(self.doc_df.title)] + \
            [l.lower().split(' ') for l in list(self.doc_df.abstract)]
        
        # make vocab list for autocompletion
        stop_words = pd.read_csv('stopwords.txt')
        stop_words_set = set(stop_words.stopwords)

        words = [item for sublist in all_words_lists for item in sublist if item not in stop_words_set]
        word_counter = Counter(words)
        top_words = [k for k, v in sorted(word_counter.items(), key=lambda item: -item[1])]
        # top_words = top_words[:1000]
        
        doc_word_list = []
        for d in self.doc_df.title:
            doc_word_list.extend(d.lower().split(' '))
        doc_word_list = [w for w in doc_word_list if w not in stop_words_set]
        word_counter = Counter(doc_word_list)
        top_doc_words = [k for k, v in sorted(word_counter.items(), key=lambda item: -item[1])]
        # top_doc_words = top_doc_words[:2000]
        
        
        self.vocab = set(# [l for l in list(self.doc_df.year.astype(str))] + \
            top_words + top_doc_words +\
            # [l for l in list(self.word_meta_df.word.astype(str))] + \
            [l.lower() for l in list(self.auth_meta_df.name)] + \
            [l.lower() for l in list(self.doc_df.title)])
        self.closest_voc_dict = {}
        self.auto_list = [{'label':w, "id":i}  for i,w in enumerate(list(sorted(self.vocab, key=lambda w:len(w))))]

        self.init_coordinates()

        self.in_clusters = self.original_clusters
        self.out_clusters = {}

        self.indices_to_vis = {key:self.original_clusters[key].copy() for key in random.sample(self.in_clusters.keys(),5000)}

        self.year_min, self.year_max = int(self.doc_meta_df.year.min()), int(self.doc_meta_df.year.max())

    def init_coordinates(self):
        tsne_x = list(self.H_tsne[:,0].tolist())
        tsne_y = list(self.H_tsne[:,1].tolist())
        clusters = list(self.clusters[:,0].tolist())
        self.original_clusters = {}
        self.original_data = {}
        for i in self.index:
            if i<self.n_a: ent_type, txt='author', 'Name: '+self.auth_meta_df.name.iat[i]
            elif i<self.n_a+self.n_d: ent_type, txt='doc', 'Title: '+self.doc_meta_df.title.iat[i-self.n_a] + '\n' + 'Venue: '+self.doc_meta_df.venue.iat[i-self.n_a]
            else: ent_type, txt = 'word', 'Word: '+str(self.word_meta_df.word.loc[i-self.n_a-self.n_d])
            self.original_data[i] = {
                'x':tsne_x[i],
                'y':tsne_y[i],
                'etype':ent_type,
                'txt':txt,
                'index':i
            }
            self.original_clusters[i] = {
                "cid":clusters[i],
            }

        self.xmin_d = min([self.original_data[d]['x'] for d in self.original_data])
        self.xmax_d = max([self.original_data[d]['x'] for d in self.original_data])
        self.ymin_d = min([self.original_data[d]['y'] for d in self.original_data])
        self.ymax_d = max([self.original_data[d]['y'] for d in self.original_data])

    def set_initial_out_clusters(self):
        self.out_clusters = {k:self.original_clusters[k] for k in self.original_clusters}
        self.in_clusters = {}

    def query_contain_single_query(self, query, all_df):
        flag = all_df.str.contains(query[0], na=False, case=False)
        for i in range(len(query)//2):
            flag = ((flag) & (all_df.str.contains(query[2*i+2], na=False, case=False)))
        return flag

    def query_contain_single_query_all_entity(self, query, topk, mode):
        if query[0].startswith("author:"):
            target_word_id = self.auth_word2id[query[0][7:]]
        else:
            target_word_id = self.word2id[query[0]] + self.n_a + self.n_d
        target_vec = self.H[target_word_id,:]
        if mode == "euclidean":
            row_dist = target_vec*target_vec + self.H*self.H - target_vec*self.H*2
            row_dist = np.sqrt(np.sum(row_dist, axis=1))
        else:
            pass # ㅇㅣ부분 작작성성
        
        row_dist_sum = row_dist
        for i in range(len(query)//2):
            target_word_id = self.word2id[query[2*i+2]] + self.n_a + self.n_d
            target_vec = self.H[target_word_id,:]
            if mode == "euclidean":
                row_dist = target_vec*target_vec + self.H*self.H - target_vec*self.H*2
                row_dist = np.sqrt(np.sum(row_dist, axis=1))
            else:
                pass # ㅇㅣ부분 작작성성
            row_dist_sum += row_dist
        thres = sorted(row_dist_sum)[topk]
        flag = (row_dist_sum < thres)
        return flag

    def filter_all_entity(self, queries, topk, mode="euclidean"):
        flag = self.query_contain_single_query_all_entity(queries[0], topk, mode)

        for i in range(len(queries)//2):
            if queries[2*i+1] == "AND":
                flag = ((flag) & self.query_contain_single_query_all_entity(queries[2*i+2], topk, mode))
            else:
                flag = ((flag) | self.query_contain_single_query_all_entity(queries[2*i+2], topk, mode))

        filtered_doc = self.doc_df[flag[self.n_a:self.n_a+self.n_d]] if self.etype_selection_search["doc"] == True else pd.DataFrame()
        filtered_word = self.word_meta_df[flag[self.n_a+self.n_d:self.n_a+self.n_d+self.n_w]] if self.etype_selection_search["word"] == True else pd.DataFrame()
        # filtered_auth = self.auth_meta_df[flag[:self.n_a]]
        # filtered_auth = self.auth_meta_df.loc[self.author_doc_df[self.author_doc_df.doc.isin(filtered_doc.index)].index.unique()]
        filtered_auth = self.auth_meta_df.loc[self.author_doc_df[self.author_doc_df.doc.isin(filtered_doc.index)].index.unique().union(np.where(flag[:self.n_a])[0])] \
             if self.etype_selection_search["auth"] == True else pd.DataFrame()
        return filtered_doc, filtered_word, filtered_auth

    def filter_dataset(self, queries):
        if self.etype_selection_search["doc"] is False:
            return []
        doc_df = self.doc_df[(self.doc_df.year>=self.year_selected[0]) & (self.doc_df.year<=self.year_selected[1])].copy()
        all_df = doc_df.title.str.replace(" ","") + doc_df.venue.str.replace(" ","") + doc_df.abstract.str.replace(" ","")
        
        flag = self.query_contain_single_query(queries[0], all_df)

        for i in range(len(queries)//2):
            if queries[2*i+1] == "AND":
                flag = ((flag) & self.query_contain_single_query(queries[2*i+2], all_df))
            else:
                flag = ((flag) | self.query_contain_single_query(queries[2*i+2], all_df))
        
        filtered_df = doc_df[flag]
        return filtered_df

    def query_contain_single_query_word(self, query, all_df):
        flag = all_df.str.contains(query[0], na=False, case=False)
        for i in range(len(query)//2):
            flag = ((flag) | (all_df.str.contains(query[2*i+2], na=False, case=False)))
        return flag

    def filter_word(self, queries):
        if self.etype_selection_search["word"] is False:
            return []
        flag = self.query_contain_single_query_word(queries[0], self.word_meta_df.word)
        for i in range(len(queries)//2):
            flag = ((flag) | self.query_contain_single_query_word(queries[2*i+2], self.word_meta_df.word))
        filtered_df_word = self.word_meta_df[flag]
        return filtered_df_word

    def query_contain_single_query_auth(self, query, all_df):
        flag = all_df.str.contains(query[0], na=False, case=False)
        for i in range(len(query)//2):
            flag = ((flag) & (all_df.str.contains(query[2*i+2], na=False, case=False)))
        return flag
    
    def filter_auth(self, queries):
        if self.etype_selection_search["author"] is False:
            return []
        flag = self.query_contain_single_query_auth(queries[0], self.auth_meta_df.name)
        for i in range(len(queries)//2):
            flag = ((flag) | self.query_contain_single_query_auth(queries[2*i+2], self.auth_meta_df.name))
        filtered_df_auth = self.auth_meta_df[flag]
        return filtered_df_auth

    def mix_colors(self, cid_list):
        cid_tup = tuple(cid_list)
        if cid_tup in self.color_map:
            return self.color_map[cid_tup]
        r,g,b = 0,0,0
        for cid in cid_list:
            col = colors[cid%len(colors)]
            r += int(col[1:3],16)
            g += int(col[3:5],16)
            b += int(col[5:7],16)
        r//=len(cid_list)
        g//=len(cid_list)
        b//=len(cid_list)
        hex_code = "#{:X}{:X}{:X}".format(r,g,b)
        self.color_map[cid_tup] = hex_code
        return hex_code

    def generate_query_strs(self):
        query_strs = []
        for qlist in self.query_cands:
            all_qstr = ""
            for q in qlist:
                q_str = "" if all_qstr=="" else " "
                if type(q) == tuple:
                    q_str += '("'+q[0]+'"'
                    for i in range(1, len(q)):
                        if i%2 == 0:
                            q_str += ' "'+q[i]+'"'
                        else:
                            q_str += " "+q[i]
                    q_str += ")"
                else:
                    q_str += " "+ q
                all_qstr += q_str
            query_strs.append(all_qstr)
        return query_strs
    
    def populate_candidate_query(self, query_str):
        query_split = query_str.split(",")
        self.query_cands = []

        def get_closest_word(word):
            if word.startswith("author:"):
                author_word = word[7:].lower()
                if author_word in self.closest_voc_dict:
                    output = self.closest_voc_dict[author_word]
                else:
                    auth_filtered_df = self.auth_meta_df[self.auth_meta_df.name.str.lower().str.contains(author_word)]
                    if len(auth_filtered_df) == 0:
                        auth_filtered_df = self.auth_meta_df[self.auth_meta_df.name.str.lower().str.startswith(author_word[:2])]

                    auth_close_id = auth_filtered_df['name'].str.lower().apply(lambda x:levenshtein.distance(x,author_word)).idxmin()
                    output = auth_filtered_df['name'].loc[auth_close_id]
                    self.closest_voc_dict[author_word] = output
                    self.auth_word2id[output] = auth_close_id
                output = "author:"+output
            elif word in self.closest_voc_dict:
                output = self.closest_voc_dict[word]
            else:
                output = self.word_meta_df['word'].at[self.word_meta_df.apply(
                    lambda x:levenshtein.distance(
                        x['word'], word) 
                    if (type(x['word'])==str and (word[:3].startswith(x['word'][:3]) or x['word'][:3].startswith(word[:3]))) 
                    else 10000, 
                    axis=1
                ).idxmin()]
                if output==self.word_meta_df['word'].iat[0]:
                    output = self.word_meta_df['word'].at[self.word_meta_df.apply(
                        lambda x:levenshtein.distance(
                            x['word'], word) 
                        if (type(x['word'])==str and word.startswith(x['word'][:1])) 
                        else 10000, 
                        axis=1
                    ).idxmin()]
                self.closest_voc_dict[word] = output
            return output
        
        def single_query_item(query_item_arr):
            if len(query_item_arr)==1:
                target_single = get_closest_word(query_item_arr[0])
                return (target_single,)
            else:
                target_first = get_closest_word(query_item_arr[0])
                ret = (target_first,)
                for q in query_item_arr[1:]:
                    target_second = get_closest_word(q)
                    ret = ret + ("AND",target_second)
                return ret

        def make_query(query_arr, query_base_arr):
            if len(query_arr) == 0:
                return
            elif len(query_arr) == 1:
                if query_arr[0].startswith("author:"):
                    query_item = single_query_item(query_arr)
                else:
                    query_item = single_query_item(query_arr[0].split(" "))
                self.query_cands.append([query_item]+query_base_arr)
            else:
                make_query(query_arr[:-1], ["AND", single_query_item(query_arr[-1].split(" "))]+query_base_arr)
                make_query(query_arr[:-1], ["OR", single_query_item(query_arr[-1].split(" "))]+query_base_arr)
        if query_str != "_":
            make_query(query_split, [])
            self.query_strs = self.generate_query_strs()
        else:
            self.query_strs = []
        self.query_dict={}
        for i in range(len(self.query_cands)):
            self.query_dict[self.query_strs[i]] = self.query_cands[i]
        return self.query_strs