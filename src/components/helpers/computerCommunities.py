import networkx as nx
import numpy as np
import pandas as pd
import sklearn
import nilearn.connectome as nl

def read_from_1d(file):
    timeseries = []
    for i in file.readlines():
        timeseries.append([float(x) for x in i.split()])
    return np.array(timeseries)



connectivity_measure = nl.ConnectivityMeasure(kind='correlation')
timeseries = read_from_1d(open(r'C:\Users\andre\Documents\Projects\FMRI toolbox\fmri-connectivity-toolbox\src\test_data\sample_timeseries.1D'))
timeseries = timeseries.reshape(1, 89, 200) # change this later
matrix = connectivity_measure.fit_transform(timeseries).reshape(200, 200)
graph = nx.from_numpy_matrix(matrix)
communities = nx.community.louvain_communities(graph)
print(communities)




        

