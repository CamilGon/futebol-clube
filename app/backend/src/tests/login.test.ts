import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UsersConnection from '../database/models/UserConnection';
import validUser from './mocks/validatorUser';

chai.use(chaiHttp);

const { expect } = chai;

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxODc0MTM0MH0.435Md439fzno-savDEZ2dwxB5JpQg3_dwdHoy4VnPAs"


describe('Login Controller', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('retorna o token p validar o login', async function () {
    sinon.stub(UsersConnection, 'findOne').resolves(UsersConnection.build(validUser));
    const response = await chai.request(app).post('/login').send({ email: 'lucas@admin.com', password: 'citytetra' });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });
  it('deve retornar a função do usuário se um token válido for fornecido', async function () {
    const response = await chai.request(app).get('/login/role').set({ 'Authorization': `Bearer ${validToken}` });
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ role: 'admin' });
  });
});
