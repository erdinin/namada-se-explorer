import { Table, Tag } from "antd";
import React, { useEffect } from "react";

import moment from "moment";


const Blocks = () => {

  const [blocks, setBlocks] = React.useState<any[]>()

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/blocks").then(response => response.json())
    .then(data => {
      setBlocks(data)
    })

  }, []);


  const columns = [
    {
      title: 'Block height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
    },
    {
      title: 'Proposer',
      dataIndex: 'moniker',
      key: 'moniker',
    },
    {
      title: 'Block Time',
      dataIndex: 'time',
      key: 'time',
      render:(time:any) => <span>{moment(time).format('DD.MM.YYYY HH:mm:ss')}</span>
    }
  ];
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex max-lg:flex-col flex-row justify-evenly mt-8 xl:gap-8 md:gap-4 gap-2">
        {
          blocks && 
          <Table style={{width:"100%"}} title={() => 
          <>
          <div style={{display:"flex", justifyContent:"space-between"}}>            
            <Tag style={{fontSize:"18px", fontWeight:"bold", alignItems:"center"}} color="purple">Latest 25 Blocks</Tag>
          </div>
          </>}
          dataSource={blocks} columns={columns} />
          
        }
         
      </div>
    </div>
  );
};

export default Blocks;
