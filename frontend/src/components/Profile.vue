<template>
    <div class="profile-component-container">
        <div class="profile-picture-container" style="margin-top: 20px;">
            <img class="profile-picture" src="../assets/img/profilepicture.jpg">
        </div>
        <div class="profile-info-container" style="margin-top: 20px;">
            <p class="profile-name">Ryan Vankriekinge</p>
            <p class="profile-role">Leraar</p>
            <router-link to="/profile" class="button-small-white button">Naar profiel</router-link>

        </div>
    </div>
</template>

<style scoped>
.profile-component-container {
    width: 30%;
    background-color: #031f67;
    padding: 20px;
    border-radius: 40px;
    color: white; 
    min-width: 250px;
}
.profile-name{
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 100%;
    font-weight: bold;
    margin-bottom: 10px;
}
.profile-role{
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 20px;
}
.profile-info-container{
    display: flex;
    flex-wrap: wrap;
}
.button{
    margin: auto;
    margin-top: 5px;
    margin-bottom: 25px;
}
</style>