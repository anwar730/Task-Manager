class User < ApplicationRecord
  has_secure_password

  has_many :tasks, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: { case_sensitive: true }
  validates :password, confirmation: true , :length => {:within => 6..40}
  validates :password_confirmation, presence: true
end
