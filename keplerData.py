import lightkurve as lk
import matplotlib.pyplot as plt

def getKeplerData():
    #pixels = lk.search_targetpixelfile("Kepler-10").download_all()
    # pixels.plot()
    # plt.show()
    lightcurve = lk.search_lightcurvefile("Kepler-10").download_all()
    lightcurve.PDCSAP_FLUX.plot()
    plt.show()
    for elem in lightcurve:
        elem.plot()
        plt.show()

        exoplanet = elem.flatten().fold(period=0.838)
        exoplanet.plot()
        plt.show()

    # exoplanet = lightcurve.flatten().fold(period=0.838)
    # exoplanet.plot()
    # plt.show()
    # print("type of the pixels var is", type(pixels))
    # print(pixels)

if __name__ == "__main__":
    getKeplerData()