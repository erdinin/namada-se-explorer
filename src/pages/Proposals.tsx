import { Table, Tag } from "antd";
import React, { useEffect } from "react";


const Proposals = () => {

  const [proposals, setProposals] = React.useState<any>()

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/proposals").then(response => response.json())
    .then(data => {
      setProposals(data)
    })

  }, []);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'proposal_id',
      key: 'proposal_id',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Start Epoch',
      dataIndex: 'start_epoch',
      key: 'start_epoch',
    },
    {
      title: 'End Epoch',
      dataIndex: 'end_epoch',
      key: 'end_epoch',
    }
  ];
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex max-lg:flex-col flex-row justify-evenly mt-8 xl:gap-8 md:gap-4 gap-2">
        {
          proposals && 
          <Table style={{width:"100%"}} title={() => 
          <>
          <div style={{display:"flex", justifyContent:"space-between"}}>            
            <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="purple">Proposals</Tag>
            {proposals && <Tag style={{fontSize:"18px", fontWeight:"bold"}} color="red">Current Epoch - {proposals.epoch}</Tag>}
          </div>
          </>}
          dataSource={proposals.proposals} columns={columns} />
          
        }
         
      </div>
    </div>
  );
};

export default Proposals;
