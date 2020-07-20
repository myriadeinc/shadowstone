const mockData = {
    login: {
        "id": 0,
        "jsonrpc": "2.0",
        "error": null,
        "result": {
            "id": "fb7b0dc0-f28e-4353-9fd5-0abdebe32f39",
            "job": {
                "blob": "0c0cd4bce0f70534a9827f72f010e6c90667e1240dac48737fd0e70ac10f11c4e151bc9c56602200000000cefb8cbea645eb6f53f8927068ad1e2b16d57a46ea7d800f40a21ab9401e713613",
                "job_id": "zdB10ao8q4ZkKLFpV3EJTsm9w6cR",
                "target": "c2f52800",
                "id": "fb7b0dc0-f28e-4353-9fd5-0abdebe32f39",
                "height": 2130293,
                "seed_hash": "1f01d5322265039c0f531482dc13025fb6091f30f119accbecc20f87d66bba03",
                "algo": "rx/0"
            },
            "status": "OK"
        }
    },
    submit: {
        "id": 0,
        "jsonrpc": "2.0",
        "error": null,
        "result": {
            "status": "OK"
        }
    },
    keepalived: { "id": 0, "jsonrpc": "2.0", "error": null, "result": { "status": "KEEPALIVED" } },
    job: {
        "jsonrpc": "2.0",
        "method": "job",
        "params": {
            "blob": "0c0c97bee0f705330616873743b99af6937cb229862141276ad08e5e3c062e955f0d5d7788d8ab00000000ac87606adaa28f3143bbd0db1808819481ab172454671b2114b9e97ab8d7f2ff02",
            "job_id": "SFjtJzchBTR/vNkEHmIDd7Qf3wbt",
            "target": "c2f52800",
            "id": "fb7b0dc0-f28e-4353-9fd5-0abdebe32f39",
            "height": 2130294,
            "seed_hash": "1f01d5322265039c0f531482dc13025fb6091f30f119accbecc20f87d66bba03",
            "algo": "rx/0"
        }
    }


}

module.exports = mockData