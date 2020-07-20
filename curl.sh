curl --request POST \
  --url http://daemon.myriade.io/json_rpc \
  --header 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":"0", "method":"get_block_template", "params": {"wallet_address":"44GBHzv6ZyQdJkjqZje6KLZ3xSyN1hBSFAnLP6EAqJtCRVzMzZmeXTC2AHKDS9aEDTRKmo6a6o9r9j86pYfhCWDkKjbtcns","reserve_size":8}}'