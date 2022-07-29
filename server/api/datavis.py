import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from project import initialize_from_task, colors
import numpy as np
# from sklearn.manifold import TSNE
import scipy.io as sio
from tsne import TSNE
from sklearn.decomposition import PCA
from scipy.spatial.distance import cdist
from nonnegfac.nmf import NMF

EXP_VAR_CONST = 1.5
EXP_VAR_CONST_ZOOM = 1
CLUSTER_TOPK_CONST = 30

pr = initialize_from_task('dblp0614')
pr.launch()
def get_answers(question):
    filtered_df = pr.filter_dataset(question)
    query_answer = [{'id':d['paper_id'],
                     'Abstract':d['abstract'],
                     'Title':d['title'],
                     'Authors':d['authors'].replace('<br>','').split('.')} for ind, d in filtered_df.iterrows()]
    return query_answer

def filter_data(self, etype, qtree):
    print(1)

def get_searchquery(query_text, mode="new"):
    query_tree = pr.query_dict[query_text]
    output_points = []

    if mode=="new":
        filtered_df, word_df, auth_df = pr.filter_all_entity(query_tree, pr.topknum)
    else:
        filtered_df = pr.filter_dataset(query_tree)
        word_df = pr.filter_word(query_tree)
        auth_df = pr.filter_auth(query_tree)

    # if pr.etype_selection_search["author"]:
    #     output_points += self.filter_data("author", query_tree)

    element_result_doc = [pr.detail_list_doc[i] for i,d in filtered_df.iterrows()]

    element_result_word = [pr.detail_list_word[i] for i,d in word_df.iterrows()]

    element_result_auth = [pr.detail_list_auth[i] for i,d in auth_df.iterrows()]

    result_dict = element_result_doc + element_result_word + element_result_auth
    
    all_ids = list(set([k['id'] for k in result_dict] + list(pr.indices_to_vis)))
    coord_data = {k:pr.original_data[k] for k in all_ids}
    inclusters = {k['id']:pr.original_clusters[k['id']] for k in result_dict}
    
    pr.output_list = [k['id'] for k in result_dict]
    pr.H_filtered = pr.H[pr.output_list].T
    if query_text == '("matrix" AND "factori")  OR ("biolog")':
        try:
            data = sio.loadmat("data/temp.mat")
            H,W = data["H"], data["W"]
        except:
            W, H, info = NMF().run(pr.H_filtered, 20)
            sio.savemat("data/temp.mat", {"H":H, "W":W})
    elif query_text == '("matrix")  OR ("biolog")':
        try:
            data = sio.loadmat("data/temp_matrix.mat")
            H,W = data["H"], data["W"]
        except:
            W, H, info = NMF().run(pr.H_filtered, 20)
            sio.savemat("data/temp_matrix.mat", {"H":H, "W":W})
    # elif query_text == '("neural" AND "network")  OR ("cancer")':
        # try:
        #     data = sio.loadmat("data/temp_matrix_bio.mat")
        #     H,W = data["H"], data["W"]
        # except:
        #     W, H, info = NMF().run(pr.H_filtered, 20)
        #     sio.savemat("data/temp_matrix_bio.mat", {"H":H})
    else:
        W, H, info = NMF().run(pr.H_filtered, 20)
    cids=H.argmax(axis=1)
    pr.H_filtered_tsne = pr.H[pr.output_list]
    pr.H_tsne_filtered = pr.H_tsne[pr.output_list]
    pr.cid_dict = {
        "cids":cids
    }

    for i in range(len(cids)):
        pr.cid_dict.setdefault(cids[i],[])
        pr.cid_dict[cids[i]].append(i)
    if query_text == '("matrix" AND "factori")  OR ("biolog")':
        embed = sio.loadmat("data/temp_tsne.mat")["embedding"]
        tsne_x = embed[:,0].tolist()
        tsne_y = embed[:,1].tolist()
    elif query_text == '("matrix")  OR ("biolog")':
        embed = sio.loadmat("data/temp_tsne_matrix.mat")["embedding"]
        tsne_x = embed[:,0].tolist()
        tsne_y = embed[:,1].tolist()
    # elif query_text == '("neural" AND "network")  OR ("cancer")':
    #     try:
    #         embed = sio.loadmat("data/temp_tsne_matrix_bio.mat")["embedding"]
    #         tsne_x = embed[:,0].tolist()
    #         tsne_y = embed[:,1].tolist()
    #     except:
    #         X_embedded = TSNE(n_components=2, init=pr.H_tsne_filtered, metric="cosine", 
    #                     cluster_ids = pr.cid_dict, n_jobs = 4,
    #                     cluster_supervise=True, shrinkage=0.4,
    #                     early_exaggeration=4.0)
    #         X_embedded.fit_transform(pr.H_filtered_tsne)

    #         tsne_x = X_embedded.embedding_[:,0].tolist()
    #         tsne_y = X_embedded.embedding_[:,1].tolist()
    #         sio.savemat("data/temp_tsne_matrix_bio.mat", {"embedding":X_embedded.embedding_})
            
    else:
        X_embedded = TSNE(n_components=2, init=pr.H_tsne_filtered, metric="cosine", 
                    cluster_ids = pr.cid_dict, n_jobs = 4,
                    cluster_supervise=True, shrinkage=pr.tsne_shrinkage,
                    early_exaggeration=4.0)
        X_embedded.fit_transform(pr.H_filtered_tsne)

        tsne_x = X_embedded.embedding_[:,0].tolist()
        tsne_y = X_embedded.embedding_[:,1].tolist()
    pr.clusters_tsne = cids.tolist()

    pr.zoom_dict = {
        pr.output_list[i]:{
            'x':tsne_x[i],
            'y':tsne_y[i],
            'cid':pr.clusters_tsne[i],
        }
        for i in range(len(pr.output_list))
    }
    for i in range(len(result_dict)):
        result_dict[i]['cid'] = int(cids[i])

    pr.cluster_info = []
    topk=10
    top_rel = -pr.H @ W
    top_entity = top_rel[:pr.n_a+pr.n_d]
    top_word = top_rel[pr.n_a+pr.n_d:]
    for i in range(H.shape[1]):
        top_ent_ids = top_entity[:,i].argsort()[:topk]
        pr.cluster_info.append({
            "Top Objects": [[pr.name_df[j], "Author" if j<pr.n_a else "Doc"] for j in top_ent_ids],
            "Keywords":pr.name_df[top_word[:,i].argsort()[:topk]+(pr.n_a+pr.n_d)].tolist(),
            "ratings":2.5,
            "cid":i+1,
        })
    return [result_dict,coord_data,
        inclusters,
        pr.indices_to_vis,
        pr.indices_to_vis,
        inclusters, 
        pr.window_width_zoom, 
        pr.window_height_zoom, [pr.x_min, pr.x_max], [pr.y_min, pr.y_max], pr.zoom_dict, pr.cluster_info, {k['id']:k for k in result_dict}]

def add_filter_item(index):
    pr.search_current_selected_items.add(index)

def set_window_size_scatter(size_str):
    width, height = size_str.split(',')
    pr.window_width_scatter = int(width)
    pr.window_height_scatter = int(height)
    
    pr.H_tsne_trans[:,0] = pr.H_tsne[:,0] * (pr.window_width_scatter-40)/(pr.x_max-pr.x_min) + 20 - pr.x_min*(pr.window_width_scatter-40)/(pr.x_max-pr.x_min)
    pr.H_tsne_trans[:,1] = pr.H_tsne[:,1] * (pr.window_height_scatter-40)/(pr.y_max-pr.y_min) + 20 - pr.y_min*(pr.window_height_scatter-40)/(pr.y_max-pr.y_min)

    
    # pr.cluster_boundaries[cluster_id] = {
    #     "centroid":cluster_mean.tolist(), 
    #     "first_boundary": first_norm,
    #     "second_boundary": second_norm, "rotate_degree":cluster_deg,
    # }
    # pr.cluster_axes[cluster_id] = {
    #     "cluster_components":cluster_components,
    #     "exp_variance":exp_variance,
    #     "cluster_mean":cluster_mean
    # }

    #TODO cluster also change   

def set_window_size_zoom(size_str):
    width, height = size_str.split(',')
    pr.window_width_zoom = int(width)
    pr.window_height_zoom = int(height)

    #TODO cluster also change   

def get_recom_entities(source_id):
    source = max(pr.current_rate, key=pr.current_rate.get)
    target_vec = pr.H[source,:]
    zoom_in_id = list(pr.in_clusters.keys())
    target_H = pr.H[zoom_in_id]
    row_dist = target_vec*target_vec + target_H*target_H - target_vec*target_H*2
    row_dist = np.sqrt(np.sum(row_dist, axis=1))
    top_50 = row_dist.argsort()[:10]
    pr.detail_object = {
        k:
        {
            "id":k,
            "Type": "Author",
            "Name": None, #pr.auth_meta_df.name.loc[k],
            "Description":None,
            "detail":None, #" // ".join(list(pr.doc_meta_df.loc[list(pr.author_doc_df.doc.loc[[k]])].title))
        } if k<pr.n_a
        else (
            {
                "id":k,
                "Type": "Doc",
                "Name": None, #pr.doc_meta_df.title.loc[k-pr.n_a],
                "Description":"Venue: "+"", #pr.doc_df.venue.loc[k-pr.n_a],
            } if k<pr.n_a+pr.n_d
            else {
                'id': k,
                'Type':'Word',
                'Name':None, # pr.word_meta_df.word.loc[k - pr.n_a - pr.n_d],
                'Description':None
            }
        )
        for k in pr.in_clusters
    }

    #TODO make descriptive
    recom_entities = [
        {
            "id": zoom_in_id[i],
            "Name": pr.detail_object[zoom_in_id[i]]['Name'],
            "Type": pr.detail_object[zoom_in_id[i]]['Type'],
        }
        for i in top_50
    ]
    return [recom_entities]

def get_zoom_entities(coord_str):
    x_min, x_max, y_min, y_max = coord_str.split(',')
    x_min, x_max, y_min, y_max = float(x_min), float(x_max), float(y_min), float(y_max)

    width, height = x_max-x_min, y_max-y_min
    pr.zoomed_clusters = {}
    pr.zoomed_in_clusters = {}
    for cid in pr.cluster_boundaries:
        x,y = pr.cluster_axes[cid]["cluster_mean"]
        if x>=x_min and x<=x_max and y>=y_min and y<=y_max:
            pr.zoomed_clusters[cid] = pr.cluster_boundaries[cid].copy()
    
    zoomed_cluster_set = set(pr.zoomed_clusters.keys())
    pr.zoomed_in_clusters = {
        k:pr.in_clusters[k]
        for k in pr.in_clusters
        if len(zoomed_cluster_set.intersection(pr.in_clusters[k]['cid'])) > 0
    }
    pr.detail_object = {
        k:
        {
            "id":k,
            "Type": "Author",
            "Name": pr.auth_meta_df.name.loc[k],
            "Description":None,
            "detail":" // ".join(list(pr.doc_meta_df.loc[list(pr.author_doc_df.doc.loc[[k]])].title))
        } if k<pr.n_a
        else (
            {
                "id":k,
                "Type": "Doc",
                "Name": pr.doc_meta_df.title.loc[k-pr.n_a],
                "Description":"Venue: "+pr.doc_df.venue.loc[k-pr.n_a],
            } if k<pr.n_a+pr.n_d
            else {
                'id': k,
                'Type':'Word',
                'Name':pr.word_meta_df.word.loc[k - pr.n_a - pr.n_d],
                'Description':None
            }
        )
        for k in pr.zoomed_in_clusters
    }
    # try:
    #     xmin_d = min([pr.original_data[d]['x'] for d in pr.zoomed_in_clusters])
    #     xmax_d = max([pr.original_data[d]['x'] for d in pr.zoomed_in_clusters])
    #     ymin_d = min([pr.original_data[d]['y'] for d in pr.zoomed_in_clusters])
    #     ymax_d = max([pr.original_data[d]['y'] for d in pr.zoomed_in_clusters])
    #     xmin,ymin=pr.H_tsne_trans[[d for d in pr.zoomed_in_clusters]].min(axis=0)
    #     xmax,ymax=pr.H_tsne_trans[[d for d in pr.zoomed_in_clusters]].max(axis=0)
    # except:
    #     xmin_d,ymin_d = 0,0
    #     xmax_d,ymax_d = 1,1
    #     xmin,ymin = 0,0
    #     xmax,ymax = 1,1
    # pr.zoom_x_min, pr.zoom_x_max = xmin, xmax
    # pr.zoom_y_min, pr.zoom_y_max = ymin, ymax

    # scale = np.array([((pr.window_width_zoom-40)*(pr.x_max-pr.x_min))/((pr.window_width_scatter-40)*(xmax-xmin)), 
    #                     ((pr.window_height_zoom-40)*(pr.y_max-pr.y_min))/((pr.window_height_scatter-40)*(ymax-ymin))])
    

    xmin_d = (pr.x_max-pr.x_min)*(x_min-20)/(pr.window_width_scatter-40) + pr.x_min
    xmax_d = (pr.x_max-pr.x_min)*(x_max-20)/(pr.window_width_scatter-40) + pr.x_min
    ymin_d = (pr.y_max-pr.y_min)*(y_min-20)/(pr.window_height_scatter-40) + pr.y_min
    ymax_d = (pr.y_max-pr.y_min)*(y_max-20)/(pr.window_height_scatter-40) + pr.y_min
    
    xmin, xmax = x_min, x_max
    ymin, ymax = y_min, y_max
    
    if (height)/(width) > (pr.window_height_zoom-40)/(pr.window_width_zoom-40):
        scale = (pr.window_height_zoom-40)/(height)
        x_offset, y_offset = (pr.window_width_zoom/2)-(xmax-xmin)*scale/2,20
        x_end, y_end = (pr.window_width_zoom/2)+(xmax-xmin)*scale/2, pr.window_height_zoom-20
    else:
        scale = (pr.window_width_zoom-40)/(width)
        x_offset, y_offset = 20,(pr.window_height_zoom/2)-(ymax-ymin)*scale/2
        x_end, y_end = pr.window_width_zoom-20, (pr.window_height_zoom/2)+(ymax-ymin)*scale/2
    # scale = np.array([(pr.window_width_zoom-40)/(xmax-xmin), 
    #                     (pr.window_height_zoom-40)/(ymax-ymin)])
    # pca = PCA(n_components=2)
    for cluster_id in pr.zoomed_clusters:
        # cluster_components = ((pr.cluster_axes[cluster_id]['cluster_components'].T * pr.cluster_axes[cluster_id]['exp_variance']).T) * scale * 1.25 #TODO
        # new_components = np.concatenate([cluster_components, -cluster_components])
        # pca.fit(new_components)
        # cluster_components = pca.components_
        # exp_variance = np.sqrt(pca.explained_variance_) * EXP_VAR_CONST_ZOOM
        # cluster_boundaries = (cluster_components.T * exp_variance).T
        # cluster_deg = float(np.arctan(cluster_boundaries[0][1]/cluster_boundaries[0][0]) * 180/np.pi)
        # first_norm = float(exp_variance[0])
        # second_norm = float(exp_variance[1])
        
        pr.zoomed_clusters[cluster_id]['centroid_zoom'] = ((pr.cluster_axes[cluster_id]['cluster_mean'] - np.array([xmin, ymin])) * scale+np.array([x_offset,y_offset])).tolist()
        pr.zoomed_clusters[cluster_id]['first_boundary_zoom'],\
        pr.zoomed_clusters[cluster_id]['second_boundary_zoom'] = pr.cluster_boundaries[cluster_id]['first_boundary'] * scale,\
            pr.cluster_boundaries[cluster_id]['second_boundary'] * scale
        pr.zoomed_clusters[cluster_id]['rotate_degree_zoom'] = pr.cluster_boundaries[cluster_id]['rotate_degree']
    # cluster_boundaries = (cluster_components.T * exp_variance).T

    return [pr.zoomed_clusters, pr.zoomed_in_clusters, pr.detail_object, [xmin_d, xmax_d], [ymin_d, ymax_d], [x_offset, x_end], [y_offset, y_end]]

def get_user_defined_cluster():
    target_items = set()
    cluster_log = {}
    if len(pr.search_selected_items) == 0:
        pr.set_initial_out_clusters()
    pca = PCA(n_components=2)

    for i in pr.search_current_selected_items.difference(pr.search_selected_items):
        target_vec = pr.H[i,:]
        row_dist = target_vec*target_vec + pr.H*pr.H - target_vec*pr.H*2
        row_dist = np.sum(row_dist, axis=1)
        top_50 = row_dist.argsort()[:CLUSTER_TOPK_CONST]
        target_items = target_items.union(set(top_50))

        tsne_vectors = pr.H_tsne_trans[top_50]
        pca.fit(tsne_vectors)
        cluster_components = pca.components_
        cluster_mean = pca.mean_
        exp_variance = np.sqrt(pca.explained_variance_) * EXP_VAR_CONST
        cluster_boundaries = (cluster_components.T * exp_variance).T
        cluster_deg = float(np.arctan(cluster_boundaries[0][1]/cluster_boundaries[0][0]) * 180/np.pi)
        first_norm = float(exp_variance[0])
        second_norm = float(exp_variance[1])

        diff_mean = pr.H_tsne_trans - cluster_mean
        coords = (diff_mean @ cluster_components.T)/exp_variance
        coord_sum = np.sum(coords*coords,axis=1)
        cluster_id = pr.get_cluster_id()

        # if i not in np.where(coord_sum<1)[0]:
        #     print("Error!!!!")

        for j in np.where(coord_sum<1)[0]:
            intj = int(j)
            if intj != i:
                pr.in_clusters.setdefault(intj, {
                    "cid":[],
                    "is_selected":False
                })
            else:
                pr.in_clusters.setdefault(intj, {
                    "cid":[],
                    "is_selected":True
                })
            pr.in_clusters[intj]["cid"].append(cluster_id)
            if len(pr.in_clusters[intj]["cid"]) == 1:
                pr.in_clusters[intj]["color"] = colors[pr.in_clusters[intj]["cid"][0]%len(colors)]
            else:
                pr.in_clusters[intj]["color"] = pr.mix_colors(pr.in_clusters[intj]["cid"])

            if intj in pr.out_clusters:
                del pr.out_clusters[intj]
        pr.cluster_boundaries[cluster_id] = {
            "selected_id":i,
            "centroid":cluster_mean.tolist(), 
            "first_boundary": first_norm,
            "second_boundary": second_norm, "rotate_degree":cluster_deg,
        }
        pr.cluster_axes[cluster_id] = {
            "cluster_components":cluster_components,
            "exp_variance":exp_variance,
            "cluster_mean":cluster_mean
        }
        if i < pr.n_a:
            pr.selected_history[cluster_id] = {
                'id': i,
                'type':'Author',
                'name':pr.auth_meta_df.name.loc[i],
                'selected': True
            }
        elif i < pr.n_a+pr.n_d:
            pr.selected_history[cluster_id] = {
                'id': i,
                'type':'Doc',
                'name':pr.doc_meta_df.title.loc[i-pr.n_a],
                'selected': True
            }
        else:
            pr.selected_history[cluster_id] = {
                'id': i,
                'type':'Word',
                'name':pr.word_meta_df.word.loc[i - pr.n_a - pr.n_d],
                'selected': True
            }
    pr.search_selected_items = pr.search_selected_items.union(pr.search_current_selected_items)

    return [pr.cluster_boundaries, pr.in_clusters, pr.out_clusters, pr.selected_history]

def get_filter_coordinates():
    target_items = set()
    for i,index in enumerate(list(pr.filter_items)):
        target_vec = pr.H[index,:]
        row_dist = target_vec*target_vec + pr.H*pr.H - target_vec*pr.H*2
        row_dist = np.sum(row_dist, axis=1)
        top_50 = row_dist.argsort()[:50]
        target_items = target_items.union(set(top_50))
        for j in top_50:
            pr.embedding_data[j]['c'] = int(i+1)
    embedding_data = [pr.embedding_data[d] for d in target_items]
    xys_init = np.array([pr.H_tsne[d['index']] for d in embedding_data])
    xys_target = np.array([pr.H[d['index']] for d in embedding_data])
    tsne = TSNE(init=xys_init, early_exaggeration=4, learning_rate=500)
    transformed = tsne.fit_transform(xys_target)
    for i,d in enumerate(embedding_data):
        d['x'] = float(transformed[i,0])
        d['y'] = float(transformed[i,1])
    return embedding_data

def get_recom_ents(index):
    target_idx = pr.H[index, :]
    row_dist = target_idx*target_idx + pr.H*pr.H - target_idx*pr.H*2
    row_dist = np.sum(row_dist, axis=1)
    top_50 = row_dist.argsort()[:50]
    result_list = []
    for i in range(50):
        j = int(top_50[i])
        if j < pr.n_a:
            result = {'id': j,
                'Type':'Author',
                'Name':pr.auth_meta_df.name.loc[j],
                'Description':None,
                'Detail':' // '.join(list(pr.doc_meta_df.loc[list(pr.author_doc_df.doc.loc[[j]])].title))
            }
        elif j < pr.n_a+pr.n_d:
            result = {'id': j,
                'Type':'Doc',
                'Name':pr.doc_meta_df.title.loc[j-pr.n_a],
                'Description': 'Venue: '+ pr.doc_df.venue.loc[j-pr.n_a]
            }
        else :
            result = {'id': j,
                'Type':'Word',
                'Name':pr.word_meta_df.word.loc[j - pr.n_a - pr.n_d],
                'Description':None
            }
        result_list.append(result)
    return result_list
    ##print(index)

def get_coordinates():
    return [{k:pr.original_data[k] for k in pr.indices_to_vis}, pr.indices_to_vis, pr.out_clusters, pr.indices_to_vis, [pr.x_min, pr.x_max], [pr.y_min, pr.y_max], [pr.year_min, pr.year_max]]

def get_autocomplete_list():
    return pr.auto_list


def get_edges():
    return pr.edges

def slider_change(slidervalue):
    yr_min, yr_max = slidervalue.split(',')
    yr_min, yr_max = int(yr_min), int(yr_max)
    if yr_min != pr.year_selected[0] or yr_max != pr.year_selected[1]:
        pr.year_selected = [yr_min, yr_max]
        pr.doc_df_fil = pr.doc_df[(pr.doc_df.year>=pr.year_selected[0]) & (pr.doc_df.year<=pr.year_selected[1])].copy()
        pr.doc_fil_idx = pr.doc_df_fil.index
    
def parse_query_str(query_str):
    query_strs = pr.populate_candidate_query(query_str)
    return query_strs

def entity_change_zoom(state):
    etype, tfval = state.split("_")
    pr.etype_selection_zoom[etype] = (tfval == "true")

def tsne_shrinkage_change(gamma):
    pr.tsne_shrinkage = float(gamma)
    X_embedded = TSNE(n_components=2, init=pr.H_tsne_filtered, metric="cosine", 
                cluster_ids = pr.cid_dict, n_jobs = 4,
                cluster_supervise=True, shrinkage=pr.tsne_shrinkage,
                early_exaggeration=4.0)
    X_embedded.fit_transform(pr.H_filtered_tsne)

    tsne_x = X_embedded.embedding_[:,0].tolist()
    tsne_y = X_embedded.embedding_[:,1].tolist()
    pr.zoom_dict = {
        pr.output_list[i]:{
            'x':tsne_x[i],
            'y':tsne_y[i],
            'cid':pr.clusters_tsne[i],
        }
        for i in range(len(pr.output_list))
    }
    return [pr.zoom_dict]


def entity_change_recom(state):
    etype, tfval = state.split("_")
    pr.etype_selection_recom[etype] = (tfval == "true")

def entity_change_search(state):
    etype, tfval = state.split("_")
    pr.etype_selection_search[etype] = (tfval == "true")

def topk_change(topknum):
    pr.topknum = int(topknum)
    
def rate_change(rate):
    target_id, target_rate = rate.split(',')
    target_id, target_rate = int(target_id), float(target_rate)
    pr.current_rate[target_id] = target_rate
    
def rate_change_cluster(rate):
    target_id, target_rate = rate.split(',')
    target_id, target_rate = int(target_id), float(target_rate)
    pr.cluster_info[target_id-1]['rating'] = target_rate