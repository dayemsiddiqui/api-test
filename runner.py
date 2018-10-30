import requests
from multiprocessing.pool import ThreadPool


def run_query(query, threadId, headers, base_url): # A simple function to use requests.post to make the API call. Note the json= section.
    # print("Thread {}: Started ".format(threadId))
    request = requests.post(base_url, json={'query': query}, headers=headers)
    if request.status_code == 200:
        result = request.json()
        response_time = request.elapsed.total_seconds()
        if "errors" in result:
            # print("Request Failed")
            # print("Thread {}: Ended ".format(threadId))
            return (0, response_time)
        if "error" in result["data"]:
            # print("Request Failed")
            # print("Thread {}: Ended ".format(threadId))
            return (0, response_time)
        else: 
            # print("Request Success")
            # print("Thread {}: Ended ".format(threadId))
            return (1, response_time)
    else:
        print("Query failed to run by returning code of {}. {}".format(request.status_code, query))
        print("Thread {}: Ended ".format(threadId))
        return (0, response_time)


def spawn_threads(total_thread_count, query, headers, base_url):
    results = []
    for i in range(0, total_thread_count):
        results.append(pool.apply_async(run_query, (query, i, headers, base_url)))
    return results

def get_result(threads, total_attempts=10,):
    success = 0
    avg_response_time = 0
    result = {}
    for t in threads:
        status, response_time = t.get()
        success = success + status
        if status == 1:
            avg_response_time = avg_response_time + response_time
    
    result["avg_response_time"] = avg_response_time / len(threads)
    result["total_attempts"] = total_attempts
    result["successful_attempts"] = success
    result["failed_attempts"] = total_attempts - success
    return result


def execute(query, url, headers, total_calls):
    print("Testing started please be patient...")

    ## Creating a thread pool for making concurrent calls
    pool = ThreadPool(processes=total_calls)
    
    ## Spawn threads to call endpoints
    threads = spawn_threads(total_calls, query, headers, url)

    ## Get the results
    result = get_result(threads, total_attempts=total_calls)

    # Clean Up
    pool.close()
    pool.join()

    return result

def print_result(result):
    print("=========================================================")
    print("Total API Requests Attempted: {}".format(result["total_attempts"]))
    print("Total Successful Requests: {}".format(result["successful_attempts"]))
    print("Total Failed Requests: {}".format(result["failed_attempts"]))
    print("Avg Response Time per request:  {} seconds".format(result["avg_response_time"]))
    print("=========================================================")


# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.       
query = """
query userCurrentModule {
        userCurrentModule {hasattr
            moduleId
            isLastModule
            completedByTimeModalSeen
            title
            introduction
            goal
            startDate
            dayCount
            completeDayTransition
            lastCompletedMomentDate
            iconName
            moments {
                momentId
                userMomentId
                deliveryMethod
                moduleId
                description
                title
                textDuration
                congratulatory
                lastCompletedMomentDate
                iconName
                cueRecommendations {
                    recommendation
                    iconName
                }
                geoCue {
                    name
                    addressName
                    send
                }
                timeCue {
                    time
                    repeat
                }
                media {
                    id
                    url
                    duration
                    durationUnit
                    deliveryMethod
                }
                hasFeedBack
            }
        }
    }
"""
call_count = 10
headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMWFlMTQzODYxMWExM2RiODcyODAyMzMyOWY1ZTM5NmQiLCJlbWFpbCI6ImtpZmZhbEB5b3BtYWlsLmNvbSIsImFub255bW91cyI6ZmFsc2UsInRva2VuVmFsaWRhdG9yIjoiYTcyYzA4NjEzMjg5OTAzNjc4OWU5NWFjZDEzNTE2NGEwMjIxN2Y5MDViNjU2MzNkZWIwMzk5ZmJjOTJmZjM5MWQ0NGRlNjIzZWY1NDBlNWQyYzdjYjNmNmZjOGIxY2VjIiwib3JnYW5pemF0aW9uSWQiOiJvcmdhbml6YXRpb24tZmQ3NzkzMzgtMTM2MS00Nzg5LThkYTgtMWVhMzdiMGEzOTA2IiwiY29ob3J0SWQiOiJjb2hvcnQtYTg1NTg2NGUtMTJiOS00ZTM0LWJkMWYtMmE4OWU1ODFkZTFiIiwiaWF0IjoxNTQwMzU5MTkwfQ.qjECI-uETB7yRgHBFkumi1GOBhVvlChOnoU26iQ41Jg"}
BASE_URL = 'http://localhost:3000/graphql'


report = execute(query, BASE_URL, headers, call_count)
print_result(report)