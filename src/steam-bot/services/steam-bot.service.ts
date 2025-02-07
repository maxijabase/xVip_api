import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as SteamUser from 'steam-user';
import * as TradeOfferManager from 'steam-tradeoffer-manager';
import * as SteamTotp from 'steam-totp';
import * as SteamCommunity from 'steamcommunity';

@Injectable()
export class SteamBotService implements OnModuleInit, OnModuleDestroy {
  private steamUser: SteamUser;
  private tradeManager: TradeOfferManager;
  private community: SteamCommunity;

  constructor() {
    this.steamUser = new SteamUser();
    this.community = new SteamCommunity();
    this.tradeManager = new TradeOfferManager({
      steam: this.steamUser,
      community: this.community,
      language: 'en',
      pollInterval: 5000,
    });
  }

  onModuleInit() {
    return;
    this.steamUser.logOn({
      accountName: process.env.STEAM_BOT_USERNAME ?? '',
      password: process.env.STEAM_BOT_PASSWORD ?? '',
      twoFactorCode: SteamTotp.generateAuthCode(process.env.STEAM_BOT_SHARED_SECRET ?? ''),
    });

    this.steamUser.on('loggedOn', () => {
      console.log('Logged into Steam');
      this.steamUser.setPersona(SteamUser.EPersonaState.Online);
      this.steamUser.gamesPlayed([
        {
          game_id: 440,
          game_extra_info: 'Team Fortress 2',
        },
      ]);
    });

    this.steamUser.on('webSession', (sessionID, cookies) => {
      this.tradeManager.setCookies(cookies);
      this.community.setCookies(cookies);
      this.community.startConfirmationChecker(5000, process.env.STEAM_BOT_IDENTITY_SECRET ?? '');
    });

    this.steamUser.on('error', (err) => {
      console.error('Steam bot error:', err);
    });

    this.steamUser.on('friendRelationship', (steamID, relationship) => {
      if (relationship === SteamUser.EFriendRelationship.RequestRecipient) {
        this.steamUser.addFriend(steamID);
        console.log('Accepted friend request from', steamID);
        this.steamUser.chat.sendFriendMessage(
          steamID,
          'Hello! I am ampere\'s bot. I am currently under development.',
        );
      }
    });

    this.tradeManager.on('newOffer', (offer) => {
      if (offer.partner.getSteamID64() === process.env.STEAM_BOT_OWNER_ID) {
        offer.accept((err) => {
          if (err) {
            console.error('Error accepting offer:', err);
          } else {
            console.log('Offer accepted');
          }
        });
      } else {
        offer.decline((err) => {
          if (err) {
            console.error('Error declining offer:', err);
          } else {
            console.log('Offer declined');
          }
        });
      }
    });
  }

  onModuleDestroy() {
    this.steamUser.logOff();
  }
}
