import React, {useState, useEffect} from 'react'
import './sumtable.css';

export default function SumTable({data}) {
    const [allData, setAllData] = useState([])

    useEffect(() => {
        const calculateSum = (data)=>{
            let sums = {}
            let datas = []

            data.forEach(element => {
                if(element.region in sums){
                    sums[element.region]+=element.sales
                }else{
                    sums[element.region] = element.sales
                }
            });
            for(const key in sums){

                datas.push({
                    region: key,
                    model: "sum",
                    sales: sums[key]
                })
                data.forEach(element=>{
                    if(element.region === key){
                        datas.push(element)
                    }
                })
            }
            console.log(datas)
            setAllData(datas)
        }
      calculateSum(data)
    }, [data])
    
  return (
    <div>
      <p>sum table</p>

      <table>
        <thead>
            <tr>
                <th>Region</th>
                <th>Model</th>
                <th>Sales</th>
            </tr>
        </thead>
        <tbody>
            {
                allData.map((data, index)=>{
                    return(
                        <tr key={index}>
                            <td>{data.region}</td>
                            <td>{data.model}</td>
                            <td>{data.sales}</td>
                        </tr>
                    )

                })
            }
        </tbody>
      </table>
    </div>
  )
}


