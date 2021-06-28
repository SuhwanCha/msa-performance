# Performance evaluation based on L/B, autoscaling algorithm in Microservice Architecture (Capstone design Fall, 2021)
* [Suhwan Cha](https://github.com/SuhwanCha)

## Overview

It is important to ensure high availability in running the service. Long service response times will increase the user's departure rate and reduce the service's reliability. However, in order to increase the availability of services, the necessary resources are increased and the costs are increased. Therefore, it is important to ensure high availability of services from the perspective of operating service, but to design to be less costly.
In this work, I propose an optimal design method when operating a service with a microservice architecture. To evaluate the proposed design method, this work establishes and experiments with virtual user scenarios and service examples to measure the performance of the service.
 
## Schedule
| Contents | March | April |  May  | June  |   Progress   |
|----------|-------|-------|-------|-------|--------------|
|  Designing Project  |   *  |   *   |       |       |     [Link](https://github.com/SuhwanCha/msa-performance/blob/master/Reports/Progress_1.pdf)    |
|  Server Programming  |       |  *    |   *  |       |     [Link](https://github.com/SuhwanCha/msa-performance/tree/master/Codes/EurekaApplication), [Link2](https://github.com/SuhwanCha/msa-performance/tree/master/Codes/)    |
|  Deployment  |       |       |   *  |  *    |     [pad.yaml](https://github.com/SuhwanCha/msa-performance/blob/master/Codes/deployment.yaml)    |
|  Evaluation  |       |       |     |  *    |     [Final report](https://github.com/SuhwanCha/msa-performance/blob/master/Reports/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EC%9C%B5%ED%95%A9%EC%BA%A1%EC%8A%A4%ED%86%A4%EB%94%94%EC%9E%90%EC%9D%B803(%EC%B0%A8%EC%88%98%ED%99%98).pdf)    |

## Results

* Exp. A: Only Server registered
   * Avg. response time: 90ms
   * Error rate: 16.21%
   * Transaction: 1,185.4/sec

* Exp. B-1: Use round robin
   * Avg. response time: 81ms
   * Error rate: 8.74%
   * Transaction: 1,206.4/sec

* Exp. B-2: Use ResponseTimeWeighted Load Balancer
   * Avg. response time: 80ms
   * Error rate: 5.89%
   * Transaction: 1,227.1/sec

* Exp. C-1: Server List Filtering by Response time
   * Avg. response time: 84ms
   * Error: 2.66%
   * Transaction: 1,178.4/sec

* Exp. C-2: Server List Filtering by Recent Response time
   * Avg. response time: 73ms
   * Error rate: 1.04%
   * Transaction: 1,334.4/sec

* Exp. C-3: Server List Filtering by Recent Response time, compare Server
   * Avg. response time: 73ms
   * Error rate: 0.92%
   * Transaction: 1,334.4/sec

* Exp. C-4: Recent Response time Server List Filtering, Load Balancing to least reponse time
   * Avg. response time: 73ms
   * Error Rate: 0.83 %
   * Transaction: 1,340.0/sec

## Conclusion

* Performace: Kubernetes < Ribbon (default) <Customized Load Balancer
* It is important to develop L/B algorithm for suit server situations to improve performace, and if not, the use of Load Balancer provided by Ribbon for Netflix Zuul is much better than Kubernetes Load Balancer.

## Reports

* Midterm: [Report](https://github.com/SuhwanCha/msa-performance/blob/master/Reports/midterm.pdf)
* Final: [Report](https://github.com/SuhwanCha/msa-performance/blob/master/Reports/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EC%9C%B5%ED%95%A9%EC%BA%A1%EC%8A%A4%ED%86%A4%EB%94%94%EC%9E%90%EC%9D%B803(%EC%B0%A8%EC%88%98%ED%99%98).pdf), [Demo video](https://drive.google.com/file/d/1fWsRkzsgiq-rD_ek5URU8qimg6dIqxjQ/view?usp=sharing)
