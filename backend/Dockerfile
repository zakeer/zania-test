# Base image with Python
FROM python:3.8  

# Working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port the API will run on
EXPOSE 8080

# Command to run your Starlette app
CMD ["python", "main.py"]
