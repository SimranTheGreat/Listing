from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.google_auth import verify_google_token
from services.supabase import supabase

router = APIRouter()


class GoogleLoginRequest(BaseModel):
    token: str


@router.post("/google")
def google_login(data: GoogleLoginRequest):
    try:
        user = verify_google_token(data.token)

        print("Google user:", user)

        google_id = user["sub"]
        name = user.get("name")
        email = user.get("email")
        picture = user.get("picture")

        existing_user = (
            supabase
            .table("userId")
            .select("*")
            .eq("googleId", google_id)
            .execute()
        )

        if not existing_user.data:

            new_user = (
                supabase
                .table("userId")
                .insert({
                    "googleId": google_id,
                    "userName": name,
                    "email": email,
                    "userPic": picture
                })
                .execute()
            )

            db_user = new_user.data[0]

        else:
            db_user = existing_user.data[0]

        return {
            "success": True,
            "user": db_user
        }

    except Exception as e:
        print("AUTH ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )