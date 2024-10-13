class ApiResponse {
  constructor(status, payload, message = "success") {
    this.status = status;
    this.payload = payload;
    this.message = message;
    this.issuccess = status < 400;
  }
}

export { ApiResponse };
