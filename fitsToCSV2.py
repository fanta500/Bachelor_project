import numpy
import os
import csv
from astropy.io import fits


# directory to use
directory = 'G:/KEPLER_DATA/Q0/'
directorySize = len(os.listdir(directory))
filesProcessed = 1
progress = 0.0
# ask for an input file 
print("Processing...", "0 %")
for filename in os.listdir(directory):
    if filename.endswith(".fits"):
        # Open the given fits file
        hdulist = fits.open(directory+filename)

        my_dict = {}

        for page in range(len(hdulist)-1):
            for item in hdulist[page].header:
                my_dict[item] = hdulist[page].header[item]

        scidata = my_dict

        outputFileName = filename.split('.')[0]

        with open(directory+outputFileName+'.csv', 'w') as f:
            for key in my_dict.keys():
                f.write("%s,%s\n"%(key,my_dict[key]))