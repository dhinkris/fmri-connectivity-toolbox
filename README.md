# WEB-BASED VISUALIZATION OF THE FETAL FUNCTIONAL CONNECTOME
####  Dhineshvikram Krishnamurthy, MS1, Ashwin Rajesh2, Alexander Sabel2, Catherine Limperopoulos, PhD1, and Josepheen De Asis-Cruz, MD, PhD1

1Developing  Brain Institute, Children’s National, Washington DC; 2Thomas Jefferson High School, Fairfax, Virginia

Fetal neuroimaging is a growing field that uses a variety of techniques, such as the resting state functional connectivity MRI (rs-fcMRI) used in this study, to investigate fetal brain function. Visualizing 4D rs-fcMRI, however, can be challenging because of the high number of connections in the brain. Our application, the Fetal Functional Connectivity Toolbox, hopes to assist researchers and clinicians to more effectively explore and understand their data, and communicate their findings by providing multiple tools to visualize the fetal functional connectome.


#### Timeseries and Adjacency Matrices

The graph on the left shows resting state functional data, or activity in different areas of the fetal brain over time. The plot on the right is a 200 x 200 adjacency matrix where each cell illustrates the correlation between time series signals at different regions of interest (ROIs).

<img width="1565" alt="image" src="https://user-images.githubusercontent.com/12051131/164103822-6f750cf5-81bd-44a8-a649-47e980eab5ef.png">

#### Circos Plot

The circos plot (left) was created using D3.js, and currently contains three features. The chords in the middle represent significant connections (i.e., graph edges) between brain ROIs. The individual ROIs, from 1-200, are shown as individual wedges in the inner ring. The middle ring shows the degree of the ROI, or the number of edges attached to the node. This middle ring will be expanded to include other network features such as other measures of centrality. The outer ring displays which community or module the ROIs belongs to.

#### 3D Model

The image above displays different angles of a 3D model of a fetal brain. The node locations are prespecified ROI centers which are then customized based on the ROI adjacency matrix inputted into the application. The size of the nodes, color of nodes, and connection between nodes is defined by the strength of degree, modularity, and connections of each ROI respectively. 

<img width="1913" alt="image" src="https://user-images.githubusercontent.com/12051131/164103846-765f7db5-56fb-431f-b03a-8d7d1538b1bf.png">

