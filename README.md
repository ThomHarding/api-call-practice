# API Demo Plan

## create required html elements

    template tag to use to create each called element onto the page
    select tag for a dropdown of which api to call
    list element to contain the called elements

## fetch required elements from api

    export async function
    get the url, fetch the url, set it to a json
    render the json using the template tag
        append each part of the json into the list
