import { useState } from 'react';
import './index.css';

const environments = [
  { 
    title: 'Production',
    url: 'https://worldview.earthdata.nasa.gov/'
  },
  {
    title: 'UAT',
    url: 'https://worldview.uat.earthdata.nasa.gov/'
  },
  {
    title: 'SIT',
    url: 'https://worldview.sit.earthdata.nasa.gov/'
  },
  {
    title: 'Local',
    url: 'http://localhost:3000/'
  }
];

const scenarios = [
  {
    title: 'MODIS Corrected Reflectance',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&df=true&kiosk=true&eic=si&l=OrbitTracks_Terra_Descending(opacity=0.9),Coastlines_15m,MODIS_Terra_CorrectedReflectance_TrueColor&lg=false'
  },
  {
    title: 'VIIRS Nighttime Black Marble',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&df=true&kiosk=true&eic=si&l=Coastlines_15m(opacity=0.63),VIIRS_SNPP_DayNightBand_At_Sensor_Radiance&lg=true'
  },
  {
    title: 'Subdaily GeoColor',
    url: '?v=-218.05641352247375,-98.53068072538338,146.49566203427042,106.52986177528524&ics=true&ici=5&icd=10&df=true&kiosk=true&eic=si&l=Coastlines_15m(opacity=0.77),GOES-East_ABI_GeoColor,GOES-West_ABI_GeoColor,Himawari_AHI_Band3_Red_Visible_1km&lg=false'
  },
  {
    title: 'VIIRS Fires',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&df=true&kiosk=true&eic=si&l=Coastlines_15m,VIIRS_SNPP_Thermal_Anomalies_375m_Day,VIIRS_SNPP_CorrectedReflectance_TrueColor&lg=true'
  },
  {
    title: 'Precipitation Rate',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&df=true&kiosk=true&eic=si&l=IMERG_Precipitation_Rate,Land_Mask&lg=false'
  },
  {
    title: 'Sea Surface Temperature',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&df=true&kiosk=true&eic=si&l=Coastlines_15m(opacity=0.71),GHRSST_L4_MUR_Sea_Surface_Temperature(palette=divergent_1)&lg=true'
  },
  {
    title: 'Land Surface Temperature',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&df=true&kiosk=true&eic=si&l=Coastlines_15m,MODIS_Aqua_Land_Surface_Temp_Day,MODIS_Aqua_CorrectedReflectance_TrueColor(opacity=0.8)&lg=true'
  },
  {
    title: 'Sea Ice Arctic Animation',
    url: '?v=-4171187.01916682,-4238559.180936186,4142545.3786389525,4188800.5389352706&p=arctic&df=true&kiosk=true&eic=da&l=Land_Mask,AMSRU2_Sea_Ice_Concentration_12km(palette=blue_6)&lg=true'
  },
  {
    title: 'Sea Ice Antarctic Animation',
    url: '?v=-4171187.01916682,-4238559.180936186,4142545.3786389525,4188800.5389352706&p=antarctic&df=true&kiosk=true&eic=da&l=Land_Mask,AMSRU2_Sea_Ice_Concentration_12km(palette=blue_6)&lg=true'
  }
]

function App() {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[2]);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [selectedSize, setSelectedSize] = useState({
    height: 500,
    width: 1000,
  });
  const url = selectedEnvironment.url + selectedScenario.url;

  const embedDimensions = {
    height: selectedSize.height + 'px',
    width: selectedSize.width + 'px',
  }

  const handleDimensionChange = (dimension: string, value: string) => {
    if (dimension === 'height') {
      setSelectedSize(prev => ({ ...prev, height: parseInt(value, 10) }));
    } else if (dimension === 'width') {
      setSelectedSize(prev => ({ ...prev, width: parseInt(value, 10) }));
    }
  }

  return (
    <div className="container">
      <h1>EIC Embed Test</h1>
      <div className="selector-container">
        <div className="environment-selector">
          {environments.map((env) => (
          <button
            key={env.title}
            className={`env-button ${selectedEnvironment === env ? 'selected' : ''}`}
            onClick={() => setSelectedEnvironment(env)}
          >
            {env.title}
          </button>
          ))}
        </div>
        <div className="scenario-selector">
          <select
            id="scenarioDropdown"
            value={selectedScenario.title}
            onChange={(e) => {
              const scenario = scenarios.find(sc => sc.title === e.target.value)!;
              setSelectedScenario(scenario);
            }}
          >
            {scenarios.map((scenario) => (
              <option key={scenario.title} value={scenario.title}>
                {scenario.title}
              </option>
            ))}
          </select>
        </div>
        <div className="size-inputs">
            <label>
              Width: 
              <input 
                type="number" 
                value={selectedSize.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
              />
            </label>
            <label>
              Height: 
              <input 
                type="number" 
                value={selectedSize.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
              />
            </label>
          </div>
      </div>
      <div className="embed-container" style={embedDimensions}>
        <iframe 
        src={url} role="application" sandbox="allow-modals allow-scripts allow-same-origin allow-forms allow-popups" 
        width="100%" 
        height="100%" 
        allow="fullscreen; autoplay;" 
        loading="lazy">
        </iframe>
      </div>
    </div>
  );
}

export default App
