import numpy
import os
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
        scidata = hdulist[-1].data

        # ask for an output file name
        outputFileName = filename.split('.')[0]
        output = directory + outputFileName + ".csv"

        # save your new file as a csv
        numpy.savetxt(output, scidata, fmt='%d', delimiter=',')
    if round((filesProcessed/directorySize)*100, 1) > progress:
        progress += 1
        print("Processing...", round((filesProcessed/directorySize)*100, 1), " %")
    filesProcessed += 1
