from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# api setup
client = OpenAI(
    base_url="https://api.gpt.tecky.ai/v1",
    api_key="2efb8493-d322-4a69-b725-896dbc4c3eb7"
)

@app.route('/tripplan', methods=['POST'])
def postdata():
    data = request.get_json()
    print("Received data from website:", data)

    # Constructing the prompt based on the received data
    prompt = f"""你是一位經驗豐富的租車公司助理，樂意為您提供香港自駕遊的建議路線。請提供客戶的組別，例如朋友、情侶或家庭等，以便我能更貼切地為您規劃路線。

客戶將以JSON格式提供表格，您只需回覆相應的JSON格式即可。請注意，回覆的JSON格式中，"KEY"部分必須使用英文，而"value"部分應使用中文。

建議的自駕遊路線應涵蓋香港內的新界區、九龍和香港島，並聚焦於汽車能夠到達的景點。內容中請勿提及"船"、"大澳"、"站"等，同時確保每次建議的路線都不相同，避免提供遊客熱門景點。

路線建議應包含三個地點，並著重於自駕遊。描述範圍約在100-200字，需富有吸引力。

"carpark_name"應根據相應地點附近的停車場，且絕不能顯示簡體字。

'rentalPurpose'內的郊遊意思是，建議一些汽車能夠到達的景點，例如郊野公園，農莊等等。。。讓客戶可以親親大自然，遊山玩水

'rentalPurpose'內的攝影意思是，建議一些人氣的打卡熱點，讓客戶可以在建議的景點拍照。。。

以下是一個輸出例子的參考格式：

{{
"route_suggestions": [
{{
"name": "太平山頂",
"description": "探訪香港太平山頂，這裡是欣賞香港城市美景的最佳之地。搭乘纜車前往山頂，您將沿途欣賞到壯觀的景色。山頂上設有觀景台和多家餐廳，讓您可以一邊品嚐美食，一邊欣賞香港全景。此外，不妨參訪香港天文台，深入了解香港的氣象知識。",
"parking_facility": {{
"carpark_name": "太平山頂停車場",
"carpark_link": "https://www.google.com/maps/search/太平山頂停車場",
"capacity": "約200個停車位"
}}
}},
]
}}"""

    # Add user input to the prompt
    prompt += f'\n{data["numberOfRenters"]} {data["relationship"]} {data["ageRange"]} {data["rentalDays"]} {data["rentalPurpose"]}'

    # Call OpenAI API with the dynamic prompt
    response = client.chat.completions.create(
        model='gpt-4',
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    # Extract and print the GPT-3.5-turbo response
    gpt_response = response.choices[0].message.content
    print("GPT-3.5-turbo response:", gpt_response)

    return jsonify({"result": gpt_response})


if __name__ == "__main__":
    app.run(port=5000)
