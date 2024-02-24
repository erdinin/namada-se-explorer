import { Card, Table, Tag } from "antd";
import React, { useEffect } from "react";
import {
  UserOutlined,
  FieldTimeOutlined,
  BlockOutlined,
} from "@ant-design/icons";


const Dashboard = () => {

  const [validators, setValidators] = React.useState<any>()
  const [mappedValidators, setMappedValidators] = React.useState<any>()
  const [lastBlockTime, setBlockTime] = React.useState<any>()
  const [summary, setSummary] = React.useState<any>()


  useEffect(() => {


    fetch(process.env.REACT_APP_BASE_URL + "/api/validators").then(response => response.json())
    .then(data => {setValidators(data)})

  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/summary").then(response => response.json())
    .then(data => {setSummary(data)})
  }, []);

  
  useEffect(() => {
    if(summary){
      let result=parseFloat(summary.avg_blocktime).toFixed(2)
      setBlockTime(result)      
    }
  }, [summary]);


  useEffect(() => {
    if(validators){
      const data = validators.validators.map((item:any) => ({      
        address: item.address,
        tokens: item.tokens,
        moniker: item.moniker,
        commission_rate: item.commission_rate
        }
      ))
      setMappedValidators(data)
    }
  }, [validators]);

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
    }
  ];
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex max-lg:flex-col flex-row justify-evenly mt-8 xl:gap-8 md:gap-4 gap-2">
        <Card
          hoverable={true}
          loading={false}
          className="shadow-lg max-lg:w-full w-1/4"
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row w-full justify-between">
              <div className="xl:text-5xl text-3xl text-black font-bold">
                {mappedValidators && mappedValidators.length}
              </div>
              <UserOutlined className="flex xl:text-3xl text-2xl text-white bg-[#2944df] p-4 rounded-full hover:shadow-xl" />
            </div>
            <div className="mt-4 xl:text-2xl text-xl  text-black font-bold">
              Validator Count
            </div>
          </div>
        </Card>
        <Card
          hoverable={true}
          loading={false}
          className="shadow-lg max-lg:w-full w-1/4"
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row w-full justify-between">
              <div className="xl:text-5xl text-3xl text-black font-bold">
                {summary && summary.blocks[0].height}
              </div>
              <BlockOutlined className="flex xl:text-3xl text-2xl text-white bg-[#1aaa6e] p-4 rounded-full hover:shadow-xl" />
            </div>
            <div className="mt-4 xl:text-2xl text-xl text-black font-bold">
              Latest Block
            </div>
          </div>
        </Card>
        <Card
          hoverable={true}
          loading={false}
          className="shadow-lg max-lg:w-full w-1/4"
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row w-full justify-between">
              <div className="xl:text-5xl text-3xl text-black font-bold">
                {lastBlockTime}
              </div>
              <FieldTimeOutlined className="flex xl:text-3xl text-2xl text-white bg-[#b36f16] p-4 rounded-full hover:shadow-xl" />
            </div>
            <div className="mt-4 xl:text-2xl text-xl text-black font-bold">
              Block Time (seconds)
            </div>
          </div>
        </Card>
        <Card
          hoverable={true}
          loading={false}
          className="shadow-lg max-lg:w-full w-1/4"
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row w-full justify-between">
              <div className="xl:text-5xl text-3xl text-black font-bold" style={{textWrap:"nowrap"}}>
              {validators && validators.total_stake}
              </div>
            </div>
            <div className="mt-4 xl:text-2xl text-xl text-black font-bold">
            Total Stake
            </div>
          </div>
        </Card>
      </div>
      <div className="flex max-lg:flex-col flex-row justify-evenly mt-8 xl:gap-8 md:gap-4 gap-2">
        {
          summary && 
          <Table style={{width:"100%"}} title={() => 
            <>
              <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <Tag style={{fontSize:"18px", fontWeight:"bold"}} color="purple">Top 10 Validators</Tag>
                {
                  summary && 
                  <Tag style={{fontSize:"18px", fontWeight:"bold"}} color="red">Current Epoch - {summary.epoch}</Tag>
                }
              </div>
            </>
          } dataSource={summary.validators} columns={columns} />
          
        }
         
      </div>
    </div>
  );
};

export default Dashboard;
