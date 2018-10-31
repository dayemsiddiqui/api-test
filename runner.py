import requests
from multiprocessing.pool import ThreadPool
from prettytable import PrettyTable

# A simple function to use requests.post to make the API call. Note the json= section.
def run_query(query, threadId, headers, base_url): 
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


def spawn_threads(total_thread_count, query, headers, base_url, pool):
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
    threads = spawn_threads(total_calls, query, headers, url, pool)

    ## Get the results
    result = get_result(threads, total_attempts=total_calls)

    # Clean Up
    pool.close()
    pool.join()

    return result

def print_result(result):
    x = PrettyTable()
    x.field_names = ["Metric Name", "Result"]
    x.add_row(["Total API Requests Attempted", result["total_attempts"]])
    x.add_row(["Total Successful Requests", result["successful_attempts"]])
    x.add_row(["Total Failed Requests", result["failed_attempts"]])
    x.add_row(["Avg Response Time per request in seconds", result["avg_response_time"]])

    print(x)




# report = execute(query, BASE_URL, headers, call_count)
# print_result(report)