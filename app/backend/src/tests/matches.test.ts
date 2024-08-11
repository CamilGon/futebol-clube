import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesConnection from '../database/models/Matches.connection';
import mockAllMatches from './mocks/mockAllMatches';
import mockNewMatch from './mocks/mockNewMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('MatchesController', function () {
  beforeEach(function () {
    sinon.restore();
  });

  const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxODc0MTM0MH0.435Md439fzno-savDEZ2dwxB5JpQg3_dwdHoy4VnPAs";

  it('should return all matches', async function () {
    sinon.stub(MatchesConnection, 'findAll').resolves(MatchesConnection.bulkBuild(mockAllMatches,
      { include: ['homeTeam', 'awayTeam'] }));
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockAllMatches);
  });

  it('should test the getAllOngoingMatches route', async function () {
    sinon.stub(MatchesConnection, 'findAll').resolves(MatchesConnection.bulkBuild([mockAllMatches[1]],
      { include: ['homeTeam', 'awayTeam'] }));
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([mockAllMatches[1]]);
  });

  it('should test the getAllFinishedMatches route', async function () {
    sinon.stub(MatchesConnection, 'findAll').resolves(MatchesConnection.bulkBuild([mockAllMatches[0]],
      { include: ['homeTeam', 'awayTeam'] }));
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([mockAllMatches[0]]);
  });

  it('should finish a match', async function () {
    sinon.stub(MatchesConnection, 'update').resolves();
    const response = await chai.request(app).patch('/matches/1/finish').set("Authorization", validToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  });

  it('should update a match', async function () {
    sinon.stub(MatchesConnection, 'update').resolves();
    const response = await chai.request(app).patch('/matches/1').set("Authorization", validToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Match updated!' });
  });

  it('should add a new match', async function () {
    const createStub = sinon.stub(MatchesConnection, 'create');
    createStub.resolves({
      ...mockNewMatch, 
      save: () => Promise.resolve(), 
    }as any);

    const response = await chai.request(app)
      .post('/matches')
      .set("Authorization", validToken)
      .send(mockNewMatch);

    expect(response.status).to.equal(201); 
    expect(response.body).to.deep.equal(mockNewMatch); 
    createStub.restore(); 
  });
});
