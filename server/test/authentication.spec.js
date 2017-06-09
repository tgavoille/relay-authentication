/* eslint-disable no-undef, no-unused-expressions */
import jwt from 'jsonwebtoken'

import { SECRET, ROLES } from '../config'
import { createToken } from '../authentication'

describe('Authentication', () => {
  it('creates a token for a registered user', () => {
    const userData = {
      userId: '1',
      role: 'reader',
    }

    const token = createToken(userData)
    expect(token).to.be.ok

    const payload = jwt.decode(token, SECRET)
    const expectedPayload = { iat: payload.iat, ...userData }
    expect(payload).to.deep.equal(expectedPayload)
  })

  it('creates a token for an anonymous user if user id is not given', () => {
    const userData = {
      name: 'name1',
      role: 'reader',
    }

    const token = createToken(userData)
    expect(token).to.be.ok

    const payload = jwt.decode(token, SECRET)
    const expectedPayload = {
      iat: payload.iat,
      role: ROLES.anonymous,
      userId: 'anonymous',
    }
    expect(payload).to.deep.equal(expectedPayload)
  })

  it('creates a token for an anonymous user if no user data is given', () => {
    const token = createToken(undefined)
    expect(token).to.be.ok

    const payload = jwt.decode(token, SECRET)
    const expectedPayload = {
      iat: payload.iat,
      role: ROLES.anonymous,
      userId: 'anonymous',
    }
    expect(payload).to.deep.equal(expectedPayload)
  })
})
/* eslint-enable no-undef, no-unused-expressions */
