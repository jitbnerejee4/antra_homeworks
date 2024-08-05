import React, {useState, useEffect} from 'react'
import './filtertable.css'

export default function FilterTable({data}) {
    const [selectedRegion, setSelectedRegion] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    const [filteredData, setFilteredData] = useState(data);


    const regionsMap = new Set()
    const modelsMap = new Set()

    data.forEach(element => {
        regionsMap.add(element.region)
    });
    data.forEach(element => {
        modelsMap.add(element.model)
    });
    const regions = [...regionsMap]
    const models = [...modelsMap]

    useEffect(() => {
        let tempData = data
        if(selectedRegion !== ''){
            tempData = tempData.filter((temp)=> temp.region === selectedRegion)
        }

        if(selectedModel !== ''){
            tempData = tempData.filter((temp)=> temp.model === selectedModel)
        }

        if(selectedModel === '' && selectedRegion === ''){
            setFilteredData(data)
        }else{
            setFilteredData(tempData);
        }

    }, [data, selectedModel, selectedRegion])
    

  return (
    <div>
        <p>Filter Table</p>
        <div>
            <label>
            Region Filter:
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                    <option value=''>All</option>
                    {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </label>

            <label>
            Model Filter:
                <select onChange={(e) => setSelectedModel(e.target.value)}>
                    <option value=''>All</option>
                    {models.map(model => (
                    <option value={model}>{model}</option>
                    ))}
                </select>
            </label>
        </div>
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Model</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                        <td>{item.region}</td>
                        <td>{item.model}</td>
                        <td>{item.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
