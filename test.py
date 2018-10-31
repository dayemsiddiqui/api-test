import click
from runner import * 


# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.       
query = """
query userCurrentModule {
        userCurrentModule {
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
HEADERS = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMWFlMTQzODYxMWExM2RiODcyODAyMzMyOWY1ZTM5NmQiLCJlbWFpbCI6ImtpZmZhbEB5b3BtYWlsLmNvbSIsImFub255bW91cyI6ZmFsc2UsInRva2VuVmFsaWRhdG9yIjoiYTcyYzA4NjEzMjg5OTAzNjc4OWU5NWFjZDEzNTE2NGEwMjIxN2Y5MDViNjU2MzNkZWIwMzk5ZmJjOTJmZjM5MWQ0NGRlNjIzZWY1NDBlNWQyYzdjYjNmNmZjOGIxY2VjIiwib3JnYW5pemF0aW9uSWQiOiJvcmdhbml6YXRpb24tZmQ3NzkzMzgtMTM2MS00Nzg5LThkYTgtMWVhMzdiMGEzOTA2IiwiY29ob3J0SWQiOiJjb2hvcnQtYTg1NTg2NGUtMTJiOS00ZTM0LWJkMWYtMmE4OWU1ODFkZTFiIiwiaWF0IjoxNTQwMzU5MTkwfQ.qjECI-uETB7yRgHBFkumi1GOBhVvlChOnoU26iQ41Jg"}



@click.command()
@click.option('--count', default=5, help='Number of concurrent calls you want to make to an endpoint')
@click.option('--path', default=".", help='Path to the file that contains the GraphQL query')
@click.option('--url', default="http://localhost:3000/api", help='Base URL of API Endpoint')
@click.option('--headers', help='Headers you want to send with the request')
def main(count, path, url, headers):
    report = execute(query, url, HEADERS, count)
    print_result(report)

if __name__ == "__main__":
    main()