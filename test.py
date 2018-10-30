import click

@click.command()
@click.option('--count', default=5, help='Number of concurrent calls you want to make to an endpoint')
@click.option('--path', default=".", help='Path to the file that contains the GraphQL query')
@click.option('--url', default="http://localhost:3000/api", help='Base URL of API Endpoint')
@click.option('--headers', help='Headers you want to send with the request')
def main(count, path, url, headers):
    print("Total Arguments", count, path, url, headers)

if __name__ == "__main__":
    main()