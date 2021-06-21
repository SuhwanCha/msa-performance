from __future__ import print_function
import time
import requests

import kubernetes.client
from kubernetes.client.rest import ApiException
from pprint import pprint

configuration = kubernetes.client.Configuration()
configuration.host = "http://localhost"
while True:
    now = time.time()
    URL = 'http://34.64.208.29:8800/api/pinf'
    response = requests.get(URL)
    response.status_code
    after = time.time()
    time_diff = after - now

    replica = 1
    if (time_diff > 1):
        replica = replica + 1
        # Enter a context with an instance of the API kubernetes.client
        with kubernetes.client.ApiClient(configuration) as api_client:
            # Create an instance of the API class
            api_instance = kubernetes.client.AppsV1beta1Api(api_client)
            name = 'service-a'  # str | name of the Scale
            namespace = 'msa-performance'  # str | object name and auth scope, such as for teams and projects
            body = None  # object |
            force = True  # bool | Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
            try:
                api_response = api_instance.patch_namespaced_stateful_set_scale(
                    name,
                    namespace, {"spec": {
                        "replicas": replica + 1
                    }},
                    force=force)
                pprint(api_response)
            except ApiException as e:
                print(
                    "Exception when calling AppsV1beta1Api->patch_namespaced_stateful_set_scale: %s\n"
                    % e)
    time.sleep(1)
