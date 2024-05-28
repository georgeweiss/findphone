from flask import Flask, render_template, request
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    name = request.form['name']
    phone = request.form['phone']
    address = request.form['address']
    message = request.form['message']

    email_content = f"""
    Nome: {name}
    Telefone: {phone}
    Endereço: {address}

    Mensagem:
    {message}
    """

    msg = MIMEText(email_content)
    msg['Subject'] = 'Lost Phone Assistance'
    msg['From'] = 'your_email@example.com'
    msg['To'] = 'developingwithweiss@gmail.com'

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login('email@gmail.com', 'senha')
            server.sendmail('email@gmail.com', 'developingwithweiss@gmail.com', msg.as_string())
        return {'status': 'success'}, 200
    except Exception as e:
        print(e)
        return {'status': 'error', 'message': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
