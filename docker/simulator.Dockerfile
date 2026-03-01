FROM python:3.12-slim

WORKDIR /app

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir pandas paho-mqtt

COPY Admin/dataforgovpanel.csv /app/dataforgovpanel.csv
COPY Admin/virtual_meter_gov.py /app/virtual_meter_gov.py

CMD ["python", "virtual_meter_gov.py"]