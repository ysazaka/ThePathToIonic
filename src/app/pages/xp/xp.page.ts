import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/interfaces/chapter';
import { Subscription } from 'rxjs';
import { ChapterService } from 'src/app/services/chapter.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-xp',
  templateUrl: './xp.page.html',
  styleUrls: ['./xp.page.scss'],
})
export class XpPage implements OnInit {
  private chapters = new Array<Chapter>();
  private chaptersSubscription: Subscription;
  private loading: any;

  isAdmin = false;

  constructor(
    private chapterService: ChapterService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
    ) {
    this.chaptersSubscription = this.chapterService.getChapters().subscribe(data => {
      this.chapters = data;
    });
  }

  ngOnInit() {
    if(this.authService.getAuth().currentUser.uid === 'KWQdyeuUF9gAtDdEURjvG4jt1I73')
        this.isAdmin = true;
      else
        this.isAdmin = false;
  }

  ngOnDestroy() {
    this.chaptersSubscription.unsubscribe();
  }

  async deleteChapter(id: string) {
    try {
      await this.chapterService.deleteChapter(id);
    } catch(error) {
      this.presentToast('Erro ao tentar deletar')
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
