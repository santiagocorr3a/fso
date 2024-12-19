sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    request is sent in JSON format, specified in the header CONTENT-TYPE
    activate server

    browser-->>browser: The JS code already feteched at the beginning is used to handle the data and update the HTML without triggering a page reload through a redirect