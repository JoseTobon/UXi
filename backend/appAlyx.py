from flask import Flask, request, jsonify
from flask_cors import CORS # Cross-Origin Resource Handling, to access resources from other domains
from PIL import Image
import tensorflow as tf
import pickle

"""
We need to know what is the input that the model expects, an array of the file/image?
"""
# First an application instance is created
app = Flask(__name__)

# CORS must be enabled for all resources in this case so React can access the model from the back-end
CORS(app,resources={r"/*":{"origins":"*"}})


# The uploaded image is resized and transformed into an array for the model to read
def get_img_array(img, size):
    img = img.resize(size)
    array = tf.keras.preprocessing.image.img_to_array(img)
    array = np.expand_dims(array, axis=0)
    return array


# In case of exporting the model with pickle, it's imported with it
model = pickle.load(open('ml_model.pkl', 'rb'))

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file'}), 

    file = request.files['file']
    img = Image.open(file.stream)
    try:
        img_array = get_img_array(img, (192, 256))
        data = request.get_json()
        prediction = model.predict(img_array)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True, port=8000)