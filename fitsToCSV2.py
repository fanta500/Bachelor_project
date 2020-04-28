import numpy
import os
import csv
from astropy.io import fits


not_yet_called = True       # flag argument for column name list creation
csv_columns = []
glbl_dict = []              # collection of all the datapoints (all the .fits files)

# directory to use
# G:\KEPLER_DATA\All_quarters\
# '/Users/jonathanscomputer/Desktop/Uni/Bachelor/Code/astropy/'

directory = 'G:/KEPLER_DATA/All_quarters/'
directorySize = len(os.listdir(directory))
filesProcessed = 1
progress = 0.0
# ask for an input file 
print("Processing...", "0 %")
for filename in os.listdir(directory):
    if filename.endswith(".fits"):

        hdulist = fits.open(directory+filename)

        my_dict = {}
        unwanted_data = ['PDC_EPT','PDC_EPTP','NUMBAND','PROCVER','TELESCOP','INSTRUME','FILEVER','TIMVERSN','ORIGIN','EXTVER','EXTNAME','NEXTEND','EXTEND','SIMPLE','PARALLAX','OBJECT','SCPID','TIERABSO','DATE-END','DATE-OBS']

        for page in range(len(hdulist)-1):
            for item in hdulist[page].header:
                if(item in unwanted_data): # unwanted item check
                    continue
                if(item in my_dict.keys()): # checking for duplicate item
                    continue
                if(not_yet_called):     # need to get column names only once
                    csv_columns.append(item)                                                 # add item name to list of names
                my_dict[item] = hdulist[page].header[item]
        
        not_yet_called = False 

        scidata = my_dict
        outputFileName = filename.split('.')[0]

        glbl_dict.append(my_dict)               # gather all datapoints in a single list

    if round((filesProcessed/directorySize)*100, 1) > progress:
        progress += 1
        print("Processing...", round((filesProcessed/directorySize)*100, 1), " %")
    filesProcessed += 1

try:
    with open(directory+'data_as_csv'+'.csv', 'w') as csvfile:      # write all the datapoints into a single .csv file
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        writer.writeheader()
        for data in glbl_dict:
            writer.writerow(data)
except IOError:
    print("I/O error")