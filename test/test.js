const shortid = require('shortid');
const express = require('express');
const chai = require('chai');
const request = require('supertest');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const host = process.env.HOSTNAME;
const basePath = `http://${host}:${port}`;

describe('encode', () => {
    it('should return a shortend url for original url', () => {
        let url = "http://www.google.co.il";
        let shortUrl = "ufjrhgk";
        let originalToShortMap = new Map();
        originalToShortMap.set(url, shortUrl);

        request(app)
            .get('/encode')
            .send(url)
            .expect(201)
            .then((res) => {
                expect(res).to.be.eql(`${basePath}/${shortUrl}`);
            });
    });
});

describe('decode', () => {
    it('should return the original url for a shortend url', () => {
        let url = "http://www.google.co.il";
        let shortUrl = "ufjrhgk";
        let shortToOriginalMap = new Map();
        shortToOriginalMap.set(shortUrl, url);

        request(app)
            .get('/decode')
            .send(`${basePath}/${shortUrl}`)
            .expect(201)
            .then((res) => {
                expect(res).to.be.eql(url);
            });
    });
});
