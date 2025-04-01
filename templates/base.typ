#show: rest => context {
    if target() == "paged" {
        rest
    } else if target() == "html" {
        html.elem("script", attrs: (src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"))
        rest
    } else {
        rest
    }
}

#set text(size: 12pt)
#set list(marker: [-])
