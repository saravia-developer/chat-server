import jwt from 'jsonwebtoken';

export class GenerateJWT {
  payload
  secretKey
  timeExpires

  constructor(payload, secretKey, timeExpires){
    this.payload = payload
    this.secretKey = secretKey
    this.timeExpires = timeExpires ?? '1h'
  }

  create(payload, secretKey, timeExpires){
    return jwt.sign(payload,secretKey, { expiresIn: timeExpires })
  }

  verifyJWT(token, secretKey) {
    try {
      const decoded = jwt.verify(token, secretKey)
      return { token: decoded }
    } catch (error) {
      console.error(error)
    }
  }
}