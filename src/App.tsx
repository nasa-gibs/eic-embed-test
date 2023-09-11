import { useState } from 'react';
import './index.css';

const environments = [
  { 
    title: 'Production',
    url: 'https://worldview.earthdata.nasa.gov/'
  },
  // {
  //   title: 'Local',
  //   url: 'http://localhost:3000/'
  // }
];

const scenarios = [
  {
    title: 'MODIS Corrected Reflectance',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&em=true&kiosk=true&eic=si&l=OrbitTracks_Terra_Descending(opacity=0.9),Coastlines_15m,MODIS_Terra_CorrectedReflectance_TrueColor&lg=false'
  },
  {
    title: 'VIIRS Nighttime Black Marble',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&em=true&kiosk=true&eic=si&l=Coastlines_15m(opacity=0.63),VIIRS_SNPP_DayNightBand_At_Sensor_Radiance&lg=true'
  },
  {
    title: 'Subdaily GeoColor',
    url: '?v=-218.05641352247375,-98.53068072538338,146.49566203427042,106.52986177528524&ics=true&ici=5&icd=10&em=true&kiosk=true&eic=si&l=Coastlines_15m(opacity=0.77),GOES-East_ABI_GeoColor,GOES-West_ABI_GeoColor,Himawari_AHI_Band3_Red_Visible_1km&lg=false'
  },
  {
    title: 'VIIRS Fires',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&em=true&kiosk=true&eic=si&l=Coastlines_15m,VIIRS_SNPP_Thermal_Anomalies_375m_Day,VIIRS_SNPP_CorrectedReflectance_TrueColor&lg=true'
  },
  {
    title: 'Precipitation Rate',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&em=true&kiosk=true&eic=si&l=IMERG_Precipitation_Rate,Land_Mask&lg=false'
  },
  {
    title: 'Sea Surface Temperature',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&em=true&kiosk=true&eic=si&l=Coastlines_15m(opacity=0.71),GHRSST_L4_MUR_Sea_Surface_Temperature(palette=divergent_1)&lg=true'
  },
  {
    title: 'Land Surface Temperature',
    url: '?v=-181.74360912131363,-98.53068072538338,182.80846643543055,106.52986177528524&em=true&kiosk=true&eic=si&l=Coastlines_15m,MODIS_Aqua_Land_Surface_Temp_Day,MODIS_Aqua_CorrectedReflectance_TrueColor(opacity=0.8)&lg=true'
  },
  {
    title: 'Sea Ice Arctic Animation',
    url: '?v=-4171187.01916682,-4238559.180936186,4142545.3786389525,4188800.5389352706&p=arctic&em=true&kiosk=true&eic=da&l=Land_Mask,AMSRU2_Sea_Ice_Concentration_12km(palette=blue_6)&lg=true'
  },
  {
    title: 'Sea Ice Antarctic Animation',
    url: '?v=-4171187.01916682,-4238559.180936186,4142545.3786389525,4188800.5389352706&p=antarctic&em=true&kiosk=true&eic=da&l=Land_Mask,AMSRU2_Sea_Ice_Concentration_12km(palette=blue_6)&lg=true'
  },
  {
    title: 'Animation Test Subdaily',
    url: '?v=-128.513507532474,37.36002303473546,-114.6517154141861,43.51841297062066&z=4&ics=true&ici=5&icd=10&as=2021-07-21-T00%3A30%3A00Z&ae=2021-07-21-T02%3A20%3A00Z&em=true&l=Coastlines_15m,GOES-West_ABI_GeoColor&lg=true&al=true&ab=on&t=2021-07-21-T00%3A40%3A00Z'
  },
  {
    title: 'Animation Test Daily',
    url: '?as=2023-08-01-T17%3A07%3A32Z&ae=2023-08-11-T17%3A07%3A32Z&l=Coastlines_15m,MODIS_Terra_CorrectedReflectance_TrueColor&lg=true&ab=on&t=2023-08-11-T17%3A07%3A32Z&em=true'
  },
  {
    title: 'Compare Test',
    url: '?v=-125.66524530471123,33.8184343312999,-116.92288203207836,50.065135576519594&em=true&l=Reference_Labels_15m,Reference_Features_15m,Coastlines_15m,MODIS_Aqua_CorrectedReflectance_Bands721,MODIS_Terra_CorrectedReflectance_TrueColor&lg=true&l1=Reference_Labels_15m,Reference_Features_15m,Coastlines_15m,MODIS_Aqua_CorrectedReflectance_Bands721,MODIS_Terra_CorrectedReflectance_TrueColor&lg1=true&ca=false&t=2021-07-09-T14%3A52%3A15Z&t1=2021-07-18-T14%3A52%3A15Z'
  },
  {
    title: 'Event Test',
    url: '?v=-103.50028271122204,10.26847172967436,-14.979785444452538,49.5955468174631&em=true&e=true&efs=false&efa=false&efd=2020-06-01,2020-11-30&efc=severeStorms&l=Coastlines_15m,BlueMarble_NextGeneration,MODIS_Terra_CorrectedReflectance_TrueColor&lg=true&t=2021-07-20-T15%3A00%3A46Z'
  },
  {
    title: 'Tour Story Test',
    url: '?em=true&v=-181.27301826448502,-69.19665203309799,172.63208132306409,88.85268113341039&l=Reference_Labels_15m(hidden),Reference_Features_15m(hidden),Coastlines_15m,MODIS_Combined_Flood_3-Day(disabled=3-4),MODIS_Combined_Flood_2-Day(hidden,disabled=3-4),Land_Water_Map,MODIS_Aqua_CorrectedReflectance_TrueColor(hidden),MODIS_Terra_CorrectedReflectance_TrueColor(hidden)&lg=true&tr=flood-product&t=2022-11-15-T00%3A00%3A00Z'
  }
]

const sizes = [
  {
    title: 'Portrait Phone',
    width: 414,
    height: 896,
  },
  {
    title: 'Landscape Phone',
    width: 896,
    height: 414,
  },
  {
    title: 'Portrait Tablet',
    width: 768,
    height: 1024,
  },
  {
    title: 'Landscape Tablet',
    width: 1024,
    height: 768,
  }
]

function App() {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[scenarios.length - 1]);
  const [selectedSize, setSelectedSize] = useState({
    height: 700,
    width: 900,
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
        <div className="size-selector">
          {sizes.map((size) => (
            <button
              key={size.title}
              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => setSelectedSize({height: size.height, width: size.width})}
            >
              {size.title}
            </button>
          ))}
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
