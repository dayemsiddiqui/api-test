import json

def getQuery(file_path):
    query = open(file_path, 'r')
    return query.read()
