/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        
        <div>
          <vaadin-checkbox id="cbOne">Set Reminder Time?</vaadin-checkbox>
          <br>
          
          <!-- Step 1800 is for 30 minute intervals, goes by seconds (30 * 60 = 1800) -->
          <vaadin-time-picker id="timePicker" label="Reminder Time" 
          step="1800" value="{{reminderTime}}" disabled></vaadin-time-picker>
        </div>

        <vaadin-button id="reminderButton">
          <iron-icon icon="icons:alarm-on" slot="prefix"></iron-icon>
          Set Reminder
        </vaadin-button>
      </div>
    `;
  }

  static get properties() {
    return {
      // page: {
      //   type: String,
      //   reflectToAttribute: true,
      //   observer: '_pageChanged'
      // },
      // routeData: Object
      reminderTime: {
        type: String
      }
    };
  }

  // static get observers() {
  //   return [];
  // }

  ready() {
    super.ready();
    
    // console.log("my-view1 is ready");

    // Buggy timepicker code FROM THE OFFICIAL VAADIN WEBSITE WTF
    // const timePicker = this.$.timePicker;
    // timePicker.i18n = {
    //   formatTime: function(timeObject) {
    //     console.log("Calling formatTime", timeObject);

    //     if (timeObject) {
    //       const period = timeObject.hours > 11 ? 'PM' : 'AM';
    //       const hours = timeObject.hours % 12 || 12;
    //       let mins = timeObject.minutes;
    //       const minutes = mins < 10 ? '0' + mins : mins;
    //       return hours + ':' + minutes + ' ' + period;
    //     }
    //   },
    //   parseTime: function(timeString) {
    //     console.log("Calling parseTime ", timeString);
    //     if (timeString) {
    //       const parts = /^(\d{1,2})(?::(\d{1,2}))?(?:\s(\w{2}))?$/.exec(timeString);
    //       return parts && {
    //         hours: parseInt(parts[1]) + (parts[3] == 'PM' ? 12 : 0),
    //         minutes: parts[2]
    //       };
    //     }
    //   }
    // };

    this.$.cbOne.addEventListener('click', this.toggleTimePickerDisabled.bind(this));
    this.$.reminderButton.addEventListener('click', this.setReminder.bind(this));
  }

  toggleTimePickerDisabled() {
    // console.log('Timepicker disabled? ', this.$.timePicker.disabled);

    if (this.$.timePicker.disabled) {
      this.$.timePicker.removeAttribute("disabled");
    } else {
      this.$.timePicker.setAttribute("disabled", "true");
      this.$.timePicker.value = null; // reset value as well
    }
  }

  setReminder() {
    console.log("checkbox clicked? ", this.$.cbOne.checked);
    console.log("timePicker.value: ", this.$.timePicker.value);
  }
}

window.customElements.define('my-view1', MyView1);
