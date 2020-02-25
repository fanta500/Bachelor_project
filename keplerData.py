import lightkurve as lk

def getKeplerData():
    pixels = lk.search_targetpixelfile("Kepler-10").download()
    pixels.plot()

    lightcurve = pixels.to_lightcurve()
    lightcurve.plot()

    exoplanet = lightcurve.flatten().fold(period=0.838)
    exoplanet.plot()
    print("type of the pixels var is", type(pixels))
    print(pixels)

if __name__ == "__main__":
    '''
    pixels = lk.search_targetpixelfile("Kepler-10").download_all()
    pixels.plot()

    lightcurve = pixels.to_lightcurve()
    lightcurve.plot()

    exoplanet = lightcurve.flatten().fold(period=0.838)
    exoplanet.plot()
    print("type of the pixels var is", type(pixels))
    print(pixels)
    '''
    getKeplerData()