import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Blob "mo:core/Blob";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type StateOrUT = {
    #state : State;
    #unionTerritory : UnionTerritory;
  };

  type State = {
    #andhraPradesh;
    #arunachalPradesh;
    #assam;
    #bihar;
    #chhattisgarh;
    #goa;
    #gujarat;
    #haryana;
    #himachalPradesh;
    #jharkhand;
    #karnataka;
    #kerala;
    #madhyaPradesh;
    #maharashtra;
    #manipur;
    #meghalaya;
    #mizoram;
    #nagaland;
    #odisha;
    #punjab;
    #rajasthan;
    #sikkim;
    #tamilNadu;
    #telangana;
    #tripura;
    #uttarPradesh;
    #uttarakhand;
    #westBengal;
  };

  type UnionTerritory = {
    #andamanAndNicobarIslands;
    #chandigarh;
    #dadraAndNagarHaveliAndDamanAndDiu;
    #delhi;
    #jammuAndKashmir;
    #ladakh;
    #lakshadweep;
    #puducherry;
  };

  type ContentCategory = {
    #ghazals;
    #kavitas;
    #shers;
    #nazms;
    #kahanis;
    #imageShayaris;
    #videos;
    #audioFiles;
    #top5Shayaris;
  };

  public type Poet = {
    id : Text;
    name : Text;
    biography : Text;
    stateOrUT : StateOrUT;
    website : ?Text;
    genres : [Text];
    awards : [Text];
    notableWorks : [Text];
    socialMediaLinks : [SocialMediaLink];
    image : ?Image;
    avatarImage : ?Image;
    layoutPreference : LayoutPreference;
    content : ArtistContent;
  };

  public type SocialMediaLink = {
    platform : Text;
    url : Text;
  };

  public type Image = {
    url : Text;
    description : ?Text;
  };

  public type LayoutPreference = {
    style : Text;
    colorScheme : Text;
    featuredSection : Text;
  };

  public type PoetryContent = {
    id : Text;
    title : Text;
    content : Text;
    category : ContentCategory;
    audio : ?Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
    videos : [Storage.ExternalBlob];
    textVersion : ?Text;
    visualAssets : [Storage.ExternalBlob];
  };

  public type ArtistContent = {
    bio : Text;
    biography : Text;
    location : StateOrUT;
    images : [Storage.ExternalBlob];
    poetryWorks : [PoetryContent];
    audioWorks : [PoetryContent];
    videoWorks : [PoetryContent];
    artWorks : [PoetryContent];
    textWorks : [PoetryContent];
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
    favoritePoets : [Text];
    preferences : {
      language : Text;
      theme : Text;
    };
  };

  let poets = Map.empty<Text, Poet>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var mainPoet : Poet = {
    id = "main-poet";
    name = "Shayar.in Owner";
    biography = "";
    stateOrUT = #state(#haryana);
    website = null;
    genres = [];
    awards = [];
    notableWorks = [];
    socialMediaLinks = [];
    image = null;
    avatarImage = null;
    layoutPreference = {
      style = "classic";
      colorScheme = "dark";
      featuredSection = "poetry";
    };
    content = {
      bio = "";
      biography = "";
      location = #state(#haryana);
      images = [];
      poetryWorks = [];
      audioWorks = [];
      videoWorks = [];
      artWorks = [];
      textWorks = [];
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Poet Management (Admin Only)
  public shared ({ caller }) func createPoet(id : Text, poet : Poet) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create poets");
    };
    if (poets.containsKey(id)) {
      Runtime.trap("Poet with this ID already exists");
    };
    poets.add(id, poet);
  };

  public query func getPoet(id : Text) : async Poet {
    // Public access - no authorization needed for reading poet profiles
    switch (poets.get(id)) {
      case (null) { Runtime.trap("Poet not found") };
      case (?poet) { poet };
    };
  };

  public query func getAllPoets() : async [Poet] {
    // Public access - no authorization needed
    poets.values().toArray();
  };

  public shared ({ caller }) func updatePoet(id : Text, updatedPoet : Poet) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update poets");
    };
    switch (poets.get(id)) {
      case (null) { Runtime.trap("Poet not found") };
      case (?_) {
        poets.add(id, updatedPoet);
      };
    };
  };

  public shared ({ caller }) func deletePoet(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete poets");
    };
    switch (poets.get(id)) {
      case (null) { Runtime.trap("Poet not found") };
      case (?_) {
        poets.remove(id);
      };
    };
  };

  // Poetry Content Management (Admin Only)
  public shared ({ caller }) func addPoemToPoet(poetId : Text, poem : PoetryContent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add poems");
    };
    switch (poets.get(poetId)) {
      case (null) { Runtime.trap("Poet not found") };
      case (?poet) {
        let updatedPoet = {
          poet with
          content = {
            poet.content with
            poetryWorks = poet.content.poetryWorks.concat([poem]);
          };
        };
        poets.add(poetId, updatedPoet);
      };
    };
  };

  public query func getPoemsByCategory(poetId : Text, category : ContentCategory) : async [PoetryContent] {
    // Public access - no authorization needed for reading poetry
    switch (poets.get(poetId)) {
      case (null) { Runtime.trap("Poet not found") };
      case (?poet) {
        poet.content.poetryWorks.filter(
          func(poem) {
            poem.category == category;
          }
        );
      };
    };
  };

  // Main Poet (Website Owner) Management
  public query func getMainPoet() : async Poet {
    // Public access - no authorization needed
    mainPoet;
  };

  public shared ({ caller }) func updateMainPoet(updatedPoet : Poet) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update main poet");
    };
    mainPoet := updatedPoet;
  };

  public shared ({ caller }) func addPoemToMainPoet(poem : PoetryContent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add poems to main poet");
    };
    mainPoet := {
      mainPoet with
      content = {
        mainPoet.content with
        poetryWorks = mainPoet.content.poetryWorks.concat([poem]);
      };
    };
  };

  // File Management
  public shared ({ caller }) func uploadFile(file : Storage.ExternalBlob) : async Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload files");
    };
    // Store the file and return its reference
    file;
  };
};
