import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHoursToMinutes } from './utils/convert-hours-minutes';
import { convertMinutesToHours } from './utils/convert-minutes-hours';


const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    res.json(games); 
});

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc', 
        }  
    });
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHours(ad.hourStart),
            hourEnd: convertMinutesToHours(ad.hourEnd)
        }
    }));
});

app.get('/games/:id/discord',async (req, res) => {
    const id = req.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord:true,
        },
        where: {
            id: id,
        }
    })
    res.json({discord: ad.discord});
});

app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const body: any = req.body;
 
    const newAd = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord, 
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursToMinutes(body.hourStart),
            hourEnd: convertHoursToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })  
    res.status(201).json(newAd) 
});  



app.listen(3000, () => 
    console.log('Server is running on PORT 3000'));