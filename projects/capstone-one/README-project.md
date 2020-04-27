# Capstone One - COVID-19 Stats & News Project
## Project Details
### Title
COVID-19 Stats & News

### Purpose
This app functions as a news aggregator to collect the latest COVID-19 related statistics and news for the United States. Users are able to search for news and statistics related to their specific location.

### Features
Features include account creation functionality with full authentication and database support which allows access to further functionality such as saving articles for later review as well as saving and changing filter location on the main page. A user's saved articles have sorting functionality to allow articles to be sorted by location, publication date, or source. Further functionality includes API calls to display statistics upon hovering over the main page map. These features were included best showcase the information collected from Smartable AI's COVID-19 Stats and News API.

### API - Smartable AI's COVID-19 Stats and News API
#### Website

https://developer.smartable.ai/api-details#api=coronavirus&operation=news

#### About

"Our free COVID-19 Stats and New API lets you send a web-based query to Smartable AI and get back details about global and regional coronavirus data, including latest numbers, historic values, and geo-breakdowns. It is the same API that powers our popular COVID-19 stats pages. Developers can take the returned information and display it in their own tools, apps and visualizations. Different from other coronavirus data sources that produce breaking changes from time to time, our API strives to be stable, detailed and close to real-time, by leveraging AI to gather information from many credible sources. With a few clicks in our API try-it experience, developers can get it running quickly and unleash their creativity."

#### Endpoints

1. https://api.smartable.ai/coronavirus/news/{location}

   - "Retrieve the latest coronavirus news for the selected country or state."

2. https://api.smartable.ai/coronavirus/stats/{location}
   - "Retrieve the latest and historic coronavirus stats data (confirmed cases, deaths and recovered cases) for the globe or your selected country or state."
