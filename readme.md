
```
# Ratio of Errors vs Success
sum by(status_code,path)(irate(http_requests_total{status_code="500"}[5m]))
/ 
sum by(status_code,path)(irate(http_requests_total[5m]))


sum by(status_code,path)(irate(http_requests_total{code="400"}[5m])) 
/ 

sum by(status_code,path)(irate(http_requests_total[5m]))

```


```
// 99 percentile request latency accross all instances
histogram_quantile(0.99,
  sum without(instance) rate(http_request_duration_seconds_bucket[5m]))
)
```


# Measuring SLO and Errors budger
```
# Number of requests served in the SLO window
sum(increase(http_request_duration_seconds_count[1m])) by (job)


# Number of requests that violated the latency SLO (all requests that took more than 100ms to be served)
sum(increase(http_request_duration_seconds_bucket[1m])) by (job) 
 - 
sum(increase(http_request_duration_seconds_bucket{le="0.5"}[1m])) by (job)

```


```
# Number of requests in the error budget: (100% - [slo threshold]) * [number of requests served]
(1 - 0.95) * sum(increase(http_request_duration_seconds_count[1m])) by (job)

```


```
The 3 path-method combinations with the highest number of failing requests?
topk(3, sum by(path, method) (
  rate(http_requests_total{status=~"5.."}[5m])
))
```


# Ratio of Errors vs Success
sum by(status_code,path)(irate(rendering_api_http_requests_total{status_code="500"}[5m]))
/ 
sum by(status_code,path)(irate(rendering_api_http_requests_total[5m]))
