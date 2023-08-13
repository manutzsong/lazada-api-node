	

    import {LazadaAPI} from "lazada-api-node";
    const result = await  LazadaAPI.api.GetRequest({
	    accessToken:  process.env.ACCESS_TOKEN  as  string,
	    route:  '/seller/get',
    });
   

    const  result = await  LazadaAPI.api.PostRequest({
	    accessToken:  process.env.ACCESS_TOKEN  as  string,
	    route:  '/order/shipment/providers/get',
	    parameters: {
		    getShipmentProvidersReq:  JSON.stringify({
			    orders: [
			    {
				    order_id:  739917526256613,
				    order_item_ids: [739917526356613],
			    },
			    ],
		    }),
	    },
    });


   .env is required.
   	
    APP_KEY=
	APP_SECRET=
	CALLBACK_URL="https://localhost:3000"
	
	TEST_ACCOUNT=""
	TEST_PASSWORD=""
	
	access_token=''
	refresh_token=''
	
	LAZADA_ENDPOINT=https://api.lazada.co.th/rest
