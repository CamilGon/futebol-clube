import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamsConnection from '../database/models/TeamsConnection';
import mockAllTeams from './mocks/mockAllTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('TeamsController', function () {

  beforeEach(function () {
    sinon.restore();
  });

  it('tem q retornar all equipes', async function () {
    sinon.stub(TeamsConnection, 'findAll').resolves(TeamsConnection.bulkBuild(mockAllTeams));
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockAllTeams);
  });

  it('retorna a equipe com id 1', async function () {
    sinon.stub(TeamsConnection, 'findByPk').resolves(TeamsConnection.build({ id: 1, teamName: 'Avaí/Kindermann' }));
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ id: 1, teamName: 'Avaí/Kindermann' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
