import{r as R,j as e}from"./index-94cab0b5.js";import{b as Q,F as z,c as nt,I as Y,T as at,d as it,B as H,E as ut,S as u,e as mt,C as gt,D as ht,L as ft,n as L,f as wt}from"./save_excel-a0cfa2d0.js";async function V(S){try{let m=0,f,w;const d="https://starkscan.stellate.sh/",c={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},o={query:`query TransactionsTableQuery(
  $first: Int!
  $after: String
  $input: TransactionsInput!
) {
  ...TransactionsTablePaginationFragment_transactions_2DAjA4
}

fragment TransactionsTableExpandedItemFragment_transaction on Transaction {
  entry_point_selector_name
  calldata_decoded
  entry_point_selector
  calldata
  initiator_address
  initiator_identifier
  main_calls {
    selector
    selector_name
    calldata_decoded
    selector_identifier
    calldata
    contract_address
    contract_identifier
    id
  }
}

fragment TransactionsTablePaginationFragment_transactions_2DAjA4 on Query {
  transactions(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...TransactionsTableRowFragment_transaction
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment TransactionsTableRowFragment_transaction on Transaction {
  id
  transaction_hash
  block_number
  transaction_status
  transaction_type
  timestamp
  initiator_address
  initiator_identifier
  initiator {
    is_social_verified
    id
  }
  main_calls {
    selector_identifier
    id
  }
  ...TransactionsTableExpandedItemFragment_transaction
}
`,variables:{first:30,after:null,input:{initiator_address:S,transaction_types:["INVOKE_FUNCTION"],sort_by:"timestamp",order_by:"desc",min_block_number:null,max_block_number:null,min_timestamp:null,max_timestamp:null}}},l=await Q.post(d,o,{headers:c});if(m+=l.data.data.transactions.edges.length,f=l.data.data.transactions.pageInfo.hasNextPage,f===!0)for(w=l.data.data.transactions.pageInfo.endCursor;f;){o.variables.after=w;const p=await Q.post(d,o,{headers:c});f=p.data.data.transactions.pageInfo.hasNextPage,w=p.data.data.transactions.pageInfo.endCursor,m+=p.data.data.transactions.edges.length}return{tx:m}}catch(m){return console.error(m),{tx:"Error"}}}async function et(S,m,f,w){for(let d=0;d<w.length;d++){const c=w[d].node;c.transaction_hash;const o=c.transfer_amount_display,l=c.transfer_from_address;c.timestamp,c.transfer_to_identifier;const p=c.main_call?c.main_call.selector_identifier:null;if(l==="0x0000000000000000000000000000000000000000000000000000000000000000"&&p==="handle_deposit"){const g=c.from_erc20_identifier;if(g in m){const y=m[g].amount+=parseFloat(o),C=m[g].count+=1;m[g]={amount:y,count:C}}else m[g]={amount:parseFloat(o),count:1}}else if(l===S&&p==="initiate_withdraw"){const g=c.from_erc20_identifier;if(g in f){const y=f[g].amount+=parseFloat(o),C=f[g].count+=1;f[g]={amount:y,count:C}}else f[g]={amount:parseFloat(o),count:1}}}return[m,f]}async function M(S){try{const m="https://starkscan.stellate.sh/",f={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},w={query:`query ERC20TransferEventsTableQuery(
  $first: Int!
  $after: String
  $input: ERC20TransferEventsInput!
) {
  ...ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4
}

fragment ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4 on Query {
  erc20TransferEvents(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...ERC20TransferEventsTableRowFragment_erc20TransferEvent
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment ERC20TransferEventsTableRowFragment_erc20TransferEvent on ERC20TransferEvent {
  id
  transaction_hash
  from_address
  from_erc20_identifier
  from_contract {
    is_social_verified
    id
  }
  transfer_from_address
  transfer_from_identifier
  transfer_from_contract {
    is_social_verified
    id
  }
  transfer_to_address
  transfer_to_identifier
  transfer_to_contract {
    is_social_verified
    id
  }
  transfer_amount
  transfer_amount_display
  timestamp
  main_call {
    selector_identifier
    id
  }
}
`,variables:{first:30,after:null,input:{transfer_from_or_to_address:S,call_invocation_type:"FUNCTION",sort_by:"timestamp",order_by:"desc"}}};let d=await Q.post(m,w,{headers:f}),c=d.data.data.erc20TransferEvents.edges,o={},l={},p=d.data.data.erc20TransferEvents.pageInfo.hasNextPage,g;for([o,l]=await et(S,o,l,c),p&&(g=d.data.data.erc20TransferEvents.pageInfo.endCursor);p===!0;){w.variables.after=g;let b=await Q.post(m,w,{headers:f});p=b.data.data.erc20TransferEvents.pageInfo.hasNextPage,p===!1?g=null:g=b.data.data.erc20TransferEvents.pageInfo.endCursor,[o,l]=await et(S,o,l,b.data.data.erc20TransferEvents.edges)}let y=0,C=0;for(let b in o)y+=o[b].count;for(let b in l)C+=l[b].count;return console.log(o),console.log(l),{d_eth_amount:o["StarkGate: ETH"]?parseFloat(o["StarkGate: ETH"].amount).toFixed(3):0,d_eth_count:o["StarkGate: ETH"]?o["StarkGate: ETH"].count:0,d_usdc_amount:o["StarkGate: USDC"]?parseFloat(o["StarkGate: USDC"].amount).toFixed(3):0,d_usdc_count:o["StarkGate: USDC"]?o["StarkGate: USDC"].count:0,d_usdt_amount:o["StarkGate: USDT"]?parseFloat(o["StarkGate: USDT"].amount).toFixed(3):0,d_usdt_count:o["StarkGate: USDT"]?o["StarkGate: USDT"].count:0,d_dai_amount:o["StarkGate: DAI"]?parseFloat(o["StarkGate: DAI"].amount).toFixed(3):0,d_dai_count:o["StarkGate: DAI"]?o["StarkGate: DAI"].count:0,d_wbtc_amount:o["StarkGate: WBTC"]?parseFloat(o["StarkGate: WBTC"].amount).toFixed(6):0,d_wbtc_count:o["StarkGate: WBTC"]?o["StarkGate: WBTC"].count:0,w_eth_amount:l["StarkGate: ETH"]?parseFloat(l["StarkGate: ETH"].amount).toFixed(3):0,w_eth_count:l["StarkGate: ETH"]?l["StarkGate: ETH"].count:0,w_usdc_amount:l["StarkGate: USDC"]?parseFloat(l["StarkGate: USDC"].amount).toFixed(3):0,w_usdc_count:l["StarkGate: USDC"]?l["StarkGate: USDC"].count:0,w_usdt_amount:l["StarkGate: USDT"]?parseFloat(l["StarkGate: USDT"].amount).toFixed(3):0,w_usdt_count:l["StarkGate: USDT"]?l["StarkGate: USDT"].count:0,w_dai_amount:l["StarkGate: DAI"]?parseFloat(l["StarkGate: DAI"].amount).toFixed(3):0,w_dai_count:l["StarkGate: DAI"]?l["StarkGate: DAI"].count:0,w_wbtc_amount:l["StarkGate: WBTC"]?parseFloat(l["StarkGate: WBTC"].amount).toFixed(6):0,w_wbtc_count:l["StarkGate: WBTC"]?l["StarkGate: WBTC"].count:0,total_deposit_count:y,total_widthdraw_count:C}}catch(m){return console.log(m),{d_eth_amount:"Error",d_eth_count:"Error",d_usdc_amount:"Error",d_usdc_count:"Error",d_usdt_amount:"Error",d_usdt_count:"Error",d_dai_amount:"Error",d_dai_count:"Error",d_wbtc_amount:"Error",d_wbtc_count:"Error",w_eth_amount:"Error",w_eth_count:"Error",w_usdc_amount:"Error",w_usdc_count:"Error",w_usdt_amount:"Error",w_usdt_count:"Error",w_dai_amount:"Error",w_dai_count:"Error",w_wbtc_amount:"Error",w_wbtc_count:"Error",total_deposit_count:"Error",total_widthdraw_count:"Error"}}}async function K(S){try{const m="https://starkscan.stellate.sh/",f={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},w={query:`query ContractPageQuery(
  $input: ContractInput!
) {
  contract(input: $input) {
    contract_address
    is_starknet_class_code_verified
    implementation_type
    ...ContractPageOverviewTabFragment_contract
    ...ContractPageClassCodeHistoryTabFragment_contract
    ...ContractFunctionReadWriteTabFragment_contract
    id
  }
}

fragment ContractFunctionReadCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractFunctionReadWriteTabFragment_contract on Contract {
  contract_address
  starknet_class {
    ...ContractFunctionReadCallsFragment_starknetClass
    ...ContractFunctionWriteCallsFragment_starknetClass
    id
  }
}

fragment ContractFunctionWriteCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractPageClassCodeHistoryTabFragment_contract on Contract {
  contract_address
  starknet_class {
    is_code_verified
    id
  }
  ...ContractPageCodeSubTabFragment_contract
}

fragment ContractPageCodeSubTabFragment_contract on Contract {
  starknet_class {
    class_hash
    ...StarknetClassCodeTabFragment_starknetClass
    id
  }
}

fragment ContractPageOverviewTabClassHashPlacedAtItemFragment_contract on Contract {
  deployed_at_transaction_hash
  class_hash_placed_at_transaction_hash
  class_hash_placed_at_timestamp
}

fragment ContractPageOverviewTabEthBalanceItemFragment_contract on Contract {
  eth_balance {
    balance_display
    id
  }
}

fragment ContractPageOverviewTabFragment_contract on Contract {
  contract_address
  class_hash
  name_tag
  is_social_verified
  deployed_by_contract_address
  deployed_by_contract_identifier
  deployed_at_transaction_hash
  deployed_at_timestamp
  ...ContractPageOverviewTabEthBalanceItemFragment_contract
  ...ContractPageOverviewTabTypeItemFragment_contract
  ...ContractPageOverviewTabStarknetIDItemFragment_contract
  starknet_class {
    ...StarknetClassVersionItemFragment_starknetClass
    id
  }
  ...ContractPageOverviewTabClassHashPlacedAtItemFragment_contract
}

fragment ContractPageOverviewTabStarknetIDItemFragment_contract on Contract {
  starknet_id {
    domain
  }
}

fragment ContractPageOverviewTabTypeItemFragment_contract on Contract {
  implementation_type
  starknet_class {
    type
    id
  }
}

fragment StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
  bytecode
  sierra_program
}

fragment StarknetClassCodeTabFragment_starknetClass on StarknetClass {
  ...StarknetClassCodeTabVerifiedItemFragment_starknetClass
  ...StarknetClassCodeTabSourceCodeItemFragment_starknetClass
  ...StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass
}

fragment StarknetClassCodeTabSourceCodeItemFragment_starknetClass on StarknetClass {
  class_hash
  verified {
    source_code
  }
}

fragment StarknetClassCodeTabVerifiedItemFragment_starknetClass on StarknetClass {
  is_code_verified
  verified {
    name
    source_code
    verified_at_timestamp
  }
}

fragment StarknetClassVersionItemFragment_starknetClass on StarknetClass {
  is_cairo_one
}
`,variables:{input:{contract_address:S}}},d=await Q.post(m,w,{headers:f}),c=d.data.data.contract.eth_balance.balance_display,o=d.data.data.contract.starknet_id?d.data.data.contract.starknet_id.domain:"null",l=d.data.data.contract.deployed_at_timestamp;return{eth_balance:parseFloat(c).toFixed(3),stark_id:o==="null"?"无":o,deployed_at_timestamp:l}}catch(m){return console.log(m),{eth_balance:"Error",stark_id:"Error",deployed_at_timestamp:"Error"}}}const{TextArea:pt}=Y,{Content:kt}=ft,{Column:_,ColumnGroup:$}=at,Ct=()=>{const[S,m]=R.useState(!1),[f,w]=R.useState(!1),[d,c]=R.useState([]),[o]=z.useForm(),[l,p]=R.useState(!1),[g,y]=R.useState([]),[C]=z.useForm(),b={onChange:(t,r)=>{y(t)}};R.useEffect(()=>{const t=localStorage.getItem("stark_addresses");t&&c(JSON.parse(t))},[]);const st=t=>{c(d.filter(r=>r.key!==t)),localStorage.setItem("stark_addresses",JSON.stringify(d.filter(r=>r.key!==t)))},rt=async()=>{try{const t=await C.validateFields();if(t.address.length!==66&&t.address.length!==64){L.error({message:"错误",description:"请输入正确的stark地址(64位)"},2);return}t.address.startsWith("0x")||(t.address="0x"+t.address),m(!1);const r=d.findIndex(a=>a.address===t.address);if(r!==-1){c(d.map((n,i)=>i===r?{...n,name:t.name}:n));const a=[...d];K(t.address).then(({eth_balance:n,stark_id:i,deployed_at_timestamp:s})=>{a[r]={...a[r],stark_eth_balance:n,stark_id:i,create_time:s},c(a),localStorage.setItem("stark_addresses",JSON.stringify(d))}),M(t.address).then(({d_eth_amount:n,d_eth_count:i,d_usdc_amount:s,d_usdc_count:h,d_usdt_amount:k,d_usdt_count:x,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:j,d_wbtc_count:F,w_eth_amount:E,w_eth_count:N,w_usdc_amount:v,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_deposit_count:q,total_widthdraw_count:J})=>{a[r]={...a[r],d_eth_amount:n,d_eth_count:i,d_usdc_amount:s,d_usdc_count:h,d_usdt_amount:k,d_usdt_count:x,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:j,d_wbtc_count:F,w_eth_amount:E,w_eth_count:N,w_usdc_amount:v,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_deposit_count:q,total_widthdraw_count:J},c(a),localStorage.setItem("stark_addresses",JSON.stringify(d))}),V(t.address).then(({tx:n})=>{a[r]={...a[r],stark_tx_amount:n},c(a),localStorage.setItem("stark_addresses",JSON.stringify(d))})}else{const a={key:d.length.toString(),name:t.name,address:t.address,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,total_deposit_count:null,total_widthdraw_count:null},n=[...d,a];c(n),V(t.address).then(({tx:i})=>{a.stark_tx_amount=i,c([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),K(t.address).then(({eth_balance:i,stark_id:s,deployed_at_timestamp:h})=>{a.stark_eth_balance=i,a.stark_id=s,a.create_time=h,c([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),M(t.address).then(({d_eth_amount:i,d_eth_count:s,d_usdc_amount:h,d_usdc_count:k,d_usdt_amount:x,d_usdt_count:T,d_dai_amount:I,d_dai_count:j,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:N,w_eth_count:v,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:O,w_usdt_count:P,w_dai_amount:U,w_dai_count:A,w_wbtc_amount:B,w_wbtc_count:q,total_widthdraw_count:J,total_deposit_count:W})=>{a.d_eth_amount=i,a.d_eth_count=s,a.d_usdc_amount=h,a.d_usdc_count=k,a.d_usdt_amount=x,a.d_usdt_count=T,a.d_dai_amount=I,a.d_dai_count=j,a.d_wbtc_amount=F,a.d_wbtc_count=E,a.w_eth_amount=N,a.w_eth_count=v,a.w_usdc_amount=D,a.w_usdc_count=G,a.w_usdt_amount=O,a.w_usdt_count=P,a.w_dai_amount=U,a.w_dai_count=A,a.w_wbtc_amount=B,a.w_wbtc_count=q,a.total_deposit_count=W,a.total_widthdraw_count=J,c([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))})}}catch(t){L.error({message:"错误",description:t.message},2)}finally{C.resetFields()}},ot=async()=>{try{const t=await o.validateFields(),r=t.addresses.split(`
`),a=[...d];for(let n of r){if(n=n.trim(),t.address.length!==66&&t.address.length!==64){L.error({message:"错误",description:"请输入正确的stark地址(64位)"});continue}n.startsWith("0x")||(n="0x"+n);const i=a.findIndex(s=>s.address===n);if(i!==-1){const s=[...a];V(n).then(({tx:h})=>{s[i]={...s[i],stark_tx_amount:h},c(s),localStorage.setItem("stark_addresses",JSON.stringify(s))}),K(n).then(({eth_balance:h,stark_id:k,deployed_at_timestamp:x})=>{s[i]={...s[i],stark_eth_balance:h,stark_id:k,create_time:x},c(s),localStorage.setItem("stark_addresses",JSON.stringify(s))}),M(n).then(({d_eth_amount:h,d_eth_count:k,d_usdc_amount:x,d_usdc_count:T,d_usdt_amount:I,d_usdt_count:j,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:N,d_wbtc_count:v,w_eth_amount:D,w_eth_count:G,w_usdc_amount:O,w_usdc_count:P,w_usdt_amount:U,w_usdt_count:A,w_dai_amount:B,w_dai_count:q,w_wbtc_amount:J,w_wbtc_count:W,total_widthdraw_count:X,total_deposit_count:Z})=>{s[i]={...s[i],d_eth_amount:h,d_eth_count:k,d_usdc_amount:x,d_usdc_count:T,d_usdt_amount:I,d_usdt_count:j,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:N,d_wbtc_count:v,w_eth_amount:D,w_eth_count:G,w_usdc_amount:O,w_usdc_count:P,w_usdt_amount:U,w_usdt_count:A,w_dai_amount:B,w_dai_count:q,w_wbtc_amount:J,w_wbtc_count:W,total_widthdraw_count:X,total_deposit_count:Z}})}else{const s={key:a.length.toString(),address:n,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,total_deposit_count:null,total_widthdraw_count:null};a.push(s),c(a),V(n).then(({tx:h})=>{s.stark_tx_amount=h,c([...a]),localStorage.setItem("stark_addresses",JSON.stringify(a))}),K(n).then(({eth_balance:h,stark_id:k,deployed_at_timestamp:x})=>{s.stark_eth_balance=h,s.stark_id=k,s.create_time=x,c([...a]),localStorage.setItem("stark_addresses",JSON.stringify(a))}),M(n).then(({d_eth_amount:h,d_eth_count:k,d_usdc_amount:x,d_usdc_count:T,d_usdt_amount:I,d_usdt_count:j,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:N,d_wbtc_count:v,w_eth_amount:D,w_eth_count:G,w_usdc_amount:O,w_usdc_count:P,w_usdt_amount:U,w_usdt_count:A,w_dai_amount:B,w_dai_count:q,w_wbtc_amount:J,w_wbtc_count:W,total_widthdraw_count:X,total_deposit_count:Z})=>{s.d_eth_amount=h,s.d_eth_count=k,s.d_usdc_amount=x,s.d_usdc_count=T,s.d_usdt_amount=I,s.d_usdt_count=j,s.d_dai_amount=F,s.d_dai_count=E,s.d_wbtc_amount=N,s.d_wbtc_count=v,s.w_eth_amount=D,s.w_eth_count=G,s.w_usdc_amount=O,s.w_usdc_count=P,s.w_usdt_amount=U,s.w_usdt_count=A,s.w_dai_amount=B,s.w_dai_count=q,s.w_wbtc_amount=J,s.w_wbtc_count=W,s.total_widthdraw_count=X,s.total_deposit_count=Z,c([...a]),localStorage.setItem("stark_addresses",JSON.stringify(a))})}}w(!1)}catch(t){L.error({message:"错误",description:t.message})}finally{o.resetFields()}},ct=async()=>{if(!g.length){L.error({message:"错误",description:"请先选择要刷新的地址"},2);return}p(!0);try{const t=[...d];for(let r of g){const a=t.findIndex(n=>n.key===r);if(a!==-1){const n=t[a];n.stark_tx_amount=null,n.stark_eth_balance=null,n.stark_id=null,n.create_time=null,n.d_eth_amount=null,n.d_eth_count=null,n.d_usdc_amount=null,n.d_usdc_count=null,n.d_usdt_amount=null,n.d_usdt_count=null,n.d_dai_amount=null,n.d_dai_count=null,n.d_wbtc_amount=null,n.d_wbtc_count=null,n.w_eth_amount=null,n.w_eth_count=null,n.w_usdc_amount=null,n.w_usdc_count=null,n.w_usdt_amount=null,n.w_usdt_count=null,n.w_dai_amount=null,n.w_dai_count=null,n.w_wbtc_amount=null,n.w_wbtc_count=null,n.total_widthdraw_count=null,n.total_deposit_count=null,c([...t]),V(n.address).then(({tx:i})=>{n.stark_tx_amount=i,c([...t]),localStorage.setItem("stark_addresses",JSON.stringify(d))}),K(n.address).then(({eth_balance:i,stark_id:s,deployed_at_timestamp:h})=>{n.stark_eth_balance=i,n.stark_id=s,n.create_time=h,c([...t]),localStorage.setItem("stark_addresses",JSON.stringify(d))}),M(n.address).then(({d_eth_amount:i,d_eth_count:s,d_usdc_amount:h,d_usdc_count:k,d_usdt_amount:x,d_usdt_count:T,d_dai_amount:I,d_dai_count:j,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:N,w_eth_count:v,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:O,w_usdt_count:P,w_dai_amount:U,w_dai_count:A,w_wbtc_amount:B,w_wbtc_count:q,total_widthdraw_count:J,total_deposit_count:W})=>{n.d_eth_amount=i,n.d_eth_count=s,n.d_usdc_amount=h,n.d_usdc_count=k,n.d_usdt_amount=x,n.d_usdt_count=T,n.d_dai_amount=I,n.d_dai_count=j,n.d_wbtc_amount=F,n.d_wbtc_count=E,n.w_eth_amount=N,n.w_eth_count=v,n.w_usdc_amount=D,n.w_usdc_count=G,n.w_usdt_amount=O,n.w_usdt_count=P,n.w_dai_amount=U,n.w_dai_count=A,n.w_wbtc_amount=B,n.w_wbtc_count=q,n.total_widthdraw_count=J,n.total_deposit_count=W,c([...t]),localStorage.setItem("stark_addresses",JSON.stringify(d))})}}}catch(t){L.error({message:"错误",description:t.message},2)}finally{p(!1)}},lt=()=>{c(d.filter(t=>!g.includes(t.key))),localStorage.setItem("stark_addresses",JSON.stringify(d.filter(t=>!g.includes(t.key)))),y([])},dt=()=>{wt(d,"starkInfo")},[_t,tt]=R.useState(null);return e.jsx("div",{children:e.jsxs(kt,{style:{padding:"1px"},children:[e.jsx(nt,{title:"批量添加地址",open:f,onOk:ot,onCancel:()=>{w(!1),o.resetFields()},okText:"添加地址",cancelText:"取消",children:e.jsx(z,{form:o,layout:"vertical",children:e.jsx(z.Item,{label:"地址",name:"addresses",rules:[{required:!0}],children:e.jsx(pt,{placeholder:"请输入地址，每行一个",style:{width:"500px",height:"200px"}})})})}),e.jsx(nt,{title:"添加地址",open:S,onOk:rt,onCancel:()=>m(!1),okText:"添加地址",cancelText:"取消",children:e.jsxs(z,{form:C,layout:"vertical",children:[e.jsx(z.Item,{label:"地址",name:"address",rules:[{required:!0}],children:e.jsx(Y,{placeholder:"请输入地址"})}),e.jsx(z.Item,{label:"备注",name:"name",rules:[{required:!0}],children:e.jsx(Y,{placeholder:"请输入备注"})})]})}),e.jsxs(at,{rowSelection:{type:"checkbox",...b},dataSource:d,pagination:!1,bordered:!0,style:{marginBottom:"20px"},size:"small",scroll:{x:3500},children:[e.jsx(_,{title:"备注",dataIndex:"name",align:"center",className:"name",fixed:"left",render:(t,r)=>r.key===_t?e.jsx(Y,{placeholder:"请输入备注",defaultValue:t,onPressEnter:n=>{r.name=n.target.value,c([...d]),localStorage.setItem("stark_addresses",JSON.stringify(d)),tt(null)}}):e.jsxs(e.Fragment,{children:[e.jsx(it,{color:"blue",children:t}),e.jsx(H,{shape:"circle",icon:e.jsx(ut,{}),size:"small",onClick:()=>tt(r.key)})]})},"name"),e.jsx(_,{title:"钱包地址",dataIndex:"address",align:"center",className:"address",render:(t,r)=>t===null?e.jsx(u,{}):t.slice(0,4)+"..."+t.slice(-4),fixed:"left"},"address"),e.jsx(_,{title:"创建时间",dataIndex:"create_time",align:"center",className:"create_time",render:(t,r)=>{if(t===null)return e.jsx(u,{});{let a=new Date(t*1e3),n=a.getFullYear(),i=(a.getMonth()+1).toString().padStart(2,"0"),s=a.getDate().toString().padStart(2,"0");return`${n}/${i}/${s}`}}},"create_time"),e.jsx(_,{title:"StarkId",dataIndex:"stark_id",align:"center",className:"stark_id",render:(t,r)=>t===null?e.jsx(u,{}):t},"stark_id"),e.jsxs($,{title:"StarkWare",className:"zksync2",children:[e.jsx(_,{title:"ETH",dataIndex:"stark_eth_balance",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"zks2_son"},"stark_eth_balance"),e.jsx(_,{title:"Tx",dataIndex:"stark_tx_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"zks2_son"},"stark_tx_amount"),e.jsxs($,{title:"官方桥Tx",className:"cross",children:[e.jsxs($,{title:"L1->L2",className:"cross12",children:[e.jsx(_,{title:"ETH",dataIndex:"d_eth_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_eth_tx"),e.jsx(_,{title:"DAI",dataIndex:"d_dai_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_dai_tx"),e.jsx(_,{title:"USDC",dataIndex:"d_usdc_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_usdc_tx"),e.jsx(_,{title:"WBTC",dataIndex:"d_wbtc_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_wbtc_tx"),e.jsx(_,{title:"USDT",dataIndex:"d_usdt_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_usdt_tx"),e.jsx(_,{title:"总共",dataIndex:"total_deposit_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_total_tx")]}),e.jsxs($,{title:"L2->L1",className:"cross21",children:[e.jsx(_,{title:"ETH",dataIndex:"w_eth_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_eth_tx"),e.jsx(_,{title:"DAI",dataIndex:"w_dai_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_dai_tx"),e.jsx(_,{title:"USDC",dataIndex:"w_usdc_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_usdc_tx"),e.jsx(_,{title:"WBTC",dataIndex:"w_wbtc_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_wbtc_tx"),e.jsx(_,{title:"USDT",dataIndex:"w_usdt_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_usdt_tx"),e.jsx(_,{title:"总共",dataIndex:"total_widthdraw_count",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_total_tx")]})]}),e.jsxs($,{title:"官方桥跨链额",className:"cross",children:[e.jsxs($,{title:"L1->L2",className:"cross12a",children:[e.jsx(_,{title:"ETH",dataIndex:"d_eth_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_eth_amount"),e.jsx(_,{title:"DAI",dataIndex:"d_dai_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_dai_amount"),e.jsx(_,{title:"USDC",dataIndex:"d_usdc_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_usdc_amount"),e.jsx(_,{title:"WBTC",dataIndex:"d_wbtc_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_wbtc_amount"),e.jsx(_,{title:"USDT",dataIndex:"d_usdt_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"12cross_usdt_amount")]}),e.jsxs($,{title:"L2->L1",className:"cross21a",children:[e.jsx(_,{title:"ETH",dataIndex:"w_eth_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_eth_amount"),e.jsx(_,{title:"DAI",dataIndex:"w_dai_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_dai_amount"),e.jsx(_,{title:"USDC",dataIndex:"w_usdc_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_usdc_amount"),e.jsx(_,{title:"WBTC",dataIndex:"w_wbtc_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_wbtc_amount"),e.jsx(_,{title:"USDT",dataIndex:"w_usdt_amount",align:"center",render:(t,r)=>t===null?e.jsx(u,{}):t,className:"cross_son"},"21cross_usdt_amount")]})]})]}),e.jsx(_,{className:"action",title:"操作",align:"center",render:(t,r)=>e.jsx(mt,{size:"small",children:e.jsx(H,{type:"primary",danger:!0,onClick:()=>st(r.key),children:"删除"})}),fixed:"right"},"action")]}),e.jsx(gt,{children:e.jsxs("div",{style:{width:"100%",display:"flex",justifyContent:"space-between"},children:[e.jsx(H,{type:"primary",onClick:()=>{m(!0)},size:"large",style:{width:"20%"},children:"添加地址"}),e.jsx(H,{type:"primary",onClick:()=>{w(!0)},size:"large",style:{width:"20%"},children:"批量添加地址"}),e.jsx(H,{type:"primary",onClick:ct,loading:l,size:"large",style:{width:"20%"},disabled:!g.length,children:"刷新选中地址"}),e.jsx(H,{type:"primary",danger:!0,onClick:lt,size:"large",style:{width:"20%"},disabled:!g.length,children:"删除选中地址"}),e.jsx(H,{type:"primary",icon:e.jsx(ht,{}),size:"large",style:{width:"8%"},onClick:dt})]})})]})})};export{Ct as default};
