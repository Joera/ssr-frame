

export const config : any[] = [
    {
        "slug" : "runv1",
        "ctrlr": "RunGroupV1",
        "graphs": [
            {
            "slug" : "myrunv1-1",
            "ctrlr" : "MyRunsV1",
            "args" : [],
            "parameters": [
                [
                    {
                        "label": "Moving time",
                        "column": "moving_time",
                        "colour": "white"
                    }
                ]
            ]
            }
        ],
        "segment": "nam"
    }
]