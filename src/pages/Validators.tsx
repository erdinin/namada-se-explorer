import { Input, Table, Tag } from "antd";
import React, { useEffect } from "react";


const Validators = () => {

  const [validators, setValidators] = React.useState<any[]>()
  const [data, setData] = React.useState<any[]>()


  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/validators").then(response => response.json())
    .then(data => {
      setValidators(data.validators)
      setData(data.validators)
    })

  }, []);

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Voting Power',
      dataIndex: 'tokens',
      key: 'tokens',
    },
    {
      title: 'Moniker',
      dataIndex: 'moniker',
      key: 'moniker',
    },
    {
      title: 'Commission Rate',
      dataIndex: 'commission_rate',
      key: 'commission_rate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render:(status:any) => {
         {        
          if(status == "active"){
            return <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="green">{status}</Tag>
          }
          else if (status == "inactive"){
            return <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="orange">{status}</Tag>
          }
          else if (status == "jailed"){
            return <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="red">{status}</Tag>
          }
          else{
            return <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="blue">{status}</Tag>
          }
        }
     
      }
    }
  ];
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex max-lg:flex-col flex-row justify-evenly mt-8 xl:gap-8 md:gap-4 gap-2">
        {
          validators && 
          <Table style={{width:"100%"}} title={() => 
          <>
          <div style={{display:"flex", justifyContent:"space-between"}}>            
            <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="purple">Validator List</Tag>
            <Input style={{maxWidth:"300px"}} placeholder="Search Validator" onChange={(e) => {
              const currentValue = e.target.value;
              if(currentValue.length > 0) {             
                const filteredData = validators.filter((item) =>
                  item.moniker.includes(currentValue)
                );
                setData(filteredData);
              } 
              else{
                setData(validators);
              }
            }}
            />            
          </div>
          </>}
          dataSource={data} columns={columns} />
          
        }
         
      </div>
    </div>
  );
};

export default Validators;
